"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { PropsWithChildren } from "react";
import { DarkProvider } from "@/components/providers/dark-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <DarkProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
        storageKey="station-theme"
        defaultTheme="dark"
      >
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </DarkProvider>
    </ThemeProvider>
  );
}
