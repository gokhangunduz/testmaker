import { IQuestion } from "@/interfaces/pdf.question.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";

export interface IPersistedProject {
  questions: IQuestion[];
  settings: ISettings;
  /** True when the data predates image normalisation and must be re-encoded. */
  needsNormalization?: boolean;
  /** True when restored from the synchronous backup, so IndexedDB is behind. */
  needsSave?: boolean;
}

type StoredQuestion = Omit<IQuestion, "base64">;

interface IStoredMeta {
  version?: number;
  savedAt?: number;
  questions: StoredQuestion[];
  settings: ISettings;
}

const DB_NAME = "testmaker";
const STORE_NAME = "project";
const LEGACY_KEY = "current";
const META_KEY = "meta";
const IMAGE_PREFIX = "image:";
/** 2 = every stored image is a normalised PNG/JPEG. */
const FORMAT_VERSION = 2;
const BACKUP_KEY = "project-meta";
const imageRange = () =>
  IDBKeyRange.bound(IMAGE_PREFIX, `${IMAGE_PREFIX}\uffff`);

/** Images already written to disk, so edits only rewrite what changed. */
const persistedImages = new Map<string, string>();

let databasePromise: Promise<IDBDatabase> | null = null;

/** One long-lived connection, so a save can start a transaction immediately. */
function openDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        databasePromise = null;
      };
      db.onclose = () => {
        databasePromise = null;
      };
      resolve(db);
    };
    request.onerror = () => {
      databasePromise = null;
      reject(request.error);
    };
  });

  return databasePromise;
}

function wrap<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Small synchronous copy of everything except the image data. localStorage
 * writes finish even when the page is closed right away, unlike IndexedDB.
 */
export function saveMetaBackup(project: IPersistedProject): void {
  try {
    const backup: IStoredMeta = {
      version: FORMAT_VERSION,
      savedAt: Date.now(),
      questions: project.questions.map(({ base64, ...rest }) => {
        void base64;
        return rest;
      }),
      settings: project.settings,
    };

    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
  } catch {
    // storage unavailable or full, IndexedDB is still the source of truth
  }
}

function readMetaBackup(): IStoredMeta | null {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    const backup = raw ? (JSON.parse(raw) as IStoredMeta) : null;

    return backup && Array.isArray(backup.questions) ? backup : null;
  } catch {
    return null;
  }
}

export async function loadProject(): Promise<IPersistedProject | null> {
  try {
    const db = await openDatabase();

    const store = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME);
    const storedMeta = await wrap<IStoredMeta | undefined>(store.get(META_KEY));
    const backup = readMetaBackup();
    const useBackup =
      backup !== null && backup.savedAt !== undefined &&
      backup.savedAt > (storedMeta?.savedAt ?? 0);
    const meta = useBackup ? backup : storedMeta;

    if (!meta) {
      const legacy = await wrap<IPersistedProject | undefined>(
        store.get(LEGACY_KEY)
      );
      return legacy ? { ...legacy, needsNormalization: true } : null;
    }

    const questions = await Promise.all(
      meta.questions.map(async (question) => {
        const base64 = await wrap<string | undefined>(
          store.get(`${IMAGE_PREFIX}${question.id}`)
        );
        if (!base64) return null;

        persistedImages.set(question.id, base64);
        return { ...question, base64 };
      })
    );

    return {
      questions: questions.filter((q): q is IQuestion => q !== null),
      settings: meta.settings,
      needsNormalization: (meta.version ?? 1) < FORMAT_VERSION,
      needsSave: useBackup,
    };
  } catch {
    return null;
  }
}

export async function saveProject(project: IPersistedProject): Promise<boolean> {
  try {
    const db = await openDatabase();

    const written = new Map<string, string>();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const ids = new Set(project.questions.map((q) => q.id));

      const meta: IStoredMeta = {
        version: FORMAT_VERSION,
        savedAt: Date.now(),
        questions: project.questions.map(({ base64, ...rest }) => {
          void base64;
          return rest;
        }),
        settings: project.settings,
      };
      store.put(meta, META_KEY);

      for (const question of project.questions) {
        if (persistedImages.get(question.id) !== question.base64) {
          store.put(question.base64, `${IMAGE_PREFIX}${question.id}`);
          written.set(question.id, question.base64);
        }
      }

      const keysRequest = store.getAllKeys(imageRange());
      keysRequest.onsuccess = () => {
        for (const key of keysRequest.result) {
          const id = String(key).slice(IMAGE_PREFIX.length);
          if (!ids.has(id)) store.delete(key);
        }
      };

      store.delete(LEGACY_KEY);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });

    persistedImages.clear();
    for (const question of project.questions) {
      persistedImages.set(question.id, question.base64);
    }

    return true;
  } catch {
    // storage unavailable or full, the project just won't survive a reload
    return false;
  }
}
