"use client";

import { KeyboardEvent, ReactElement, useState } from "react";
import { Input, Label, TextField } from "@heroui/react";
import { useTranslation } from "react-i18next";

interface IInputScale {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * A decimal field that accepts both "0,3" and "0.3" whatever the app language
 * is, and only applies the value once typing is finished.
 */
export default function InputScale({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: Readonly<IInputScale>): ReactElement {
  const { i18n } = useTranslation();
  const [draft, setDraft] = useState<string | null>(null);

  const formatter = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 2,
  });

  function clamp(next: number): number {
    return round(Math.min(max, Math.max(min, next)));
  }

  function commit() {
    if (draft === null) return;

    const parsed = Number(draft.trim().replace(",", "."));
    setDraft(null);

    if (draft.trim() !== "" && Number.isFinite(parsed)) {
      const next = clamp(parsed);
      if (next !== value) onChange(next);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      commit();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const base = draft === null ? value : Number(draft.replace(",", "."));
      const current = Number.isFinite(base) ? base : value;
      const next = clamp(current + (e.key === "ArrowUp" ? step : -step));
      setDraft(null);
      if (next !== value) onChange(next);
    } else if (e.key === "Escape") {
      setDraft(null);
    }
  }

  return (
    <TextField
      value={draft ?? formatter.format(value)}
      onChange={setDraft}
      onBlur={commit}
    >
      <Label>{label}</Label>
      <Input inputMode="decimal" onKeyDown={handleKeyDown} />
    </TextField>
  );
}
