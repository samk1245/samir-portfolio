"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      {mounted && <ScrollProgress />}
      {children}
    </ThemeProvider>
  );
}
