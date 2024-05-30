"use client";
import Toast from "@/components/common/Toast";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import QueryProvider from "./query.provider";
import AuthSessionProvider from "./session.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        <AuthSessionProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AuthSessionProvider>

        <Toast />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
