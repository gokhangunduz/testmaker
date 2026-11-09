"use client";

import { ReactElement } from "react";
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
} from "@heroui/react";

interface IInputColor {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function InputColor({
  label,
  color,
  onChange,
}: IInputColor): ReactElement {
  return (
    <ColorPicker
      value={color}
      onChange={(value) => onChange(value.toString("hex"))}
    >
      <ColorPicker.Trigger className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1.5 text-left hover:bg-default">
        <span className="min-w-0 break-words text-sm">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-xs uppercase text-muted">{color}</span>
          <ColorSwatch size="sm" />
        </span>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="flex flex-col gap-3 p-3">
        <ColorArea
          aria-label={label}
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
          className="max-w-full"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider aria-label={label} colorSpace="hsb" channel="hue">
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
        <ColorField aria-label={label}>
          <ColorField.Group variant="secondary">
            <ColorField.Prefix>
              <ColorSwatch size="xs" />
            </ColorField.Prefix>
            <ColorField.Input />
          </ColorField.Group>
        </ColorField>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}
