import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

/**
 * Light/Dark/System picker. A hand-rolled menu instead of the Radix dropdown:
 * three items don't justify ~20 KB of popper/menu code on every page load.
 */
const ThemeMenu = ({ testId }: { testId?: string }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = options.find((o) => o.value === theme) ?? options[0];

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    itemRefs.current[Math.max(0, options.findIndex((o) => o.value === theme))]?.focus();

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, theme]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      close(false);
      return;
    }
    const items = itemRefs.current.filter((el): el is HTMLButtonElement => el !== null);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const targets: Partial<Record<string, number>> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 };
    const next = targets[e.key];
    if (next === undefined) return;
    e.preventDefault();
    items[(next + items.length) % items.length]?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-label={`Color theme: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-testid={testId}
      >
        <current.icon className="h-4 w-4" />
      </Button>

      {open && (
        <div
          role="menu"
          aria-label="Color theme"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full mt-1 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        >
          {options.map((o, i) => (
            <button
              key={o.value}
              ref={(el) => (itemRefs.current[i] = el)}
              type="button"
              role="menuitemradio"
              aria-checked={theme === o.value}
              tabIndex={-1}
              onClick={() => {
                setTheme(o.value);
                close(true);
              }}
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              data-testid={`menu-item-${o.value}`}
            >
              <o.icon className="mr-2 h-4 w-4" />
              {o.label}
              {theme === o.value && <Check className="ml-auto h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeMenu;
