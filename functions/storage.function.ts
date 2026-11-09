import { IQuestion } from "@/interfaces/pdf.question.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";

export interface IPersistedProject {
  questions: IQuestion[];
  settings: ISettings;
}

const DB_NAME = "testmaker";
const STORE_NAME = "project";
const RECORD_KEY = "current";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  const db = await openDatabase();

  try {
    return await new Promise<T>((resolve, reject) => {
      const request = action(
        db.transaction(STORE_NAME, mode).objectStore(STORE_NAME)
      );

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function loadProject(): Promise<IPersistedProject | null> {
  try {
    const project = await run<IPersistedProject | undefined>("readonly", (s) =>
      s.get(RECORD_KEY)
    );

    return project ?? null;
  } catch {
    return null;
  }
}

export async function saveProject(project: IPersistedProject): Promise<void> {
  try {
    await run("readwrite", (s) => s.put(project, RECORD_KEY));
  } catch {
    // storage unavailable or full, the project just won't survive a reload
  }
}
