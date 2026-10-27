"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ComputerIcon, MoonIcon, SunIcon } from "./ui/icons";

export type ThemePreference = "light" | "dark" | "system";

const key = "tactile-objects:theme";
const options = [
  { value: "light" as const, label: "Light", Icon: SunIcon },
  { value: "dark" as const, label: "Dark", Icon: MoonIcon },
  { value: "system" as const, label: "System", Icon: ComputerIcon },
];

function storedPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Users who block storage still get a fully functional session switcher.
  }
  return "system";
}

function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved;
}

export function ThemeSwitcher() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const currentPreference = useRef<ThemePreference>("system");
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const ActiveIcon = options.find(option => option.value === preference)?.Icon ?? ComputerIcon;

  useEffect(() => {
    const current = storedPreference();
    setPreference(current);
    currentPreference.current = current;
    applyTheme(current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onSystemChange() {
      if (currentPreference.current === "system") applyTheme("system");
    }
    function onStorage(event: StorageEvent) {
      if (event.key !== key) return;
      const updated = storedPreference();
      currentPreference.current = updated;
      setPreference(updated);
      applyTheme(updated);
    }
    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(value: ThemePreference) {
    currentPreference.current = value;
    setPreference(value);
    try { window.localStorage.setItem(key, value); } catch {}
    applyTheme(value);
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div className="theme-switcher" ref={container}>
      <button
        ref={trigger}
        type="button"
        className="theme-switcher__trigger"
        aria-label="Appearance settings"
        title={`Appearance: ${preference}`}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(current => !current)}
      >
        <ActiveIcon size={17} aria-hidden="true" />
      </button>
      {open && (
        <div className="theme-switcher__popover" id={menuId}>
          <span className="theme-switcher__caption">APPEARANCE</span>
          <div role="group" aria-label="Colour theme" className="theme-switcher__options">
            {options.map(({ value, label, Icon }) => (
              <button
                className={preference === value ? "theme-switcher__option is-active" : "theme-switcher__option"}
                type="button"
                key={value}
                aria-pressed={preference === value}
                onClick={() => select(value)}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
                {preference === value && <CheckIcon size={15} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
