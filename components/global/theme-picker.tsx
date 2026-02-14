"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, hexToHSL } from "@/lib"
import TooltipComponent from "./tooltip-component";
import { Palette, Plus } from "lucide-react";

export default function ThemePicker() {
  const { setThemeColor, colorMap } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");
  const [customColor, setCustomColor] = useState("#ffffff");
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentTheme(document.documentElement.style.getPropertyValue("--theme"));
  }, []);

  const handleCustomColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setCustomColor(newColor);
      const hslColor = hexToHSL(newColor);
      setThemeColor(hslColor);
      setCurrentTheme(hslColor);
    },
    [setThemeColor]
  );

  const handleSetTheme = (color: string) => {
    setThemeColor(color);
    setCurrentTheme(color);
  };

  const handleCustomColorClick = () => {
    colorInputRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="fixed bottom-4 left-6 p-1 size-8 rounded-full shadow-lg bg-theme text-background transition-all duration-150 hover:scale-110 flex items-center justify-center"
          aria-label="Change theme color">
          <TooltipComponent message="Change theme color">
            <Palette className="size-5" />
          </TooltipComponent>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-3 flex gap-2 items-center flex-wrap"
        align="end"
        side="top">
        {colorMap.map(({ name, code }) => (
          <TooltipComponent key={name} message={name}>
            <button
              className={cn(
                "size-5 rounded-full cursor-pointer hover:scale-110 border border-border transition-all duration-150",
                currentTheme === code && "ring-1 ring-primary ring-offset-1"
              )}
              style={{ backgroundColor: `hsl(${code})` }}
              onClick={() => handleSetTheme(code)}
              aria-label={`Set theme color to ${name}`}
            />
          </TooltipComponent>
        ))}

        <TooltipComponent message="Custom color">
          <div className="relative">
            <button
              className={cn(
                "size-5 rounded-full cursor-pointer hover:scale-110 border border-border transition-all duration-150 flex items-center justify-center overflow-hidden",
                currentTheme === hexToHSL(customColor) &&
                "ring-1 ring-primary ring-offset-1"
              )}
              onClick={handleCustomColorClick}
              aria-label="Choose custom color"
              style={{ backgroundColor: customColor }}>
              <Plus className="" />
            </button>
            <input
              ref={colorInputRef}
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="sr-only"
              aria-label="Custom color picker"
            />
          </div>
        </TooltipComponent>
      </PopoverContent>
    </Popover>
  );
}