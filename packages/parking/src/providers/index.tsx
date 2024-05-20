"use client";
import { AuthProvider } from "@/providers/auth.provider";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import QueryProvider from "./query.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
        <Toaster position="top-right" toastOptions={{
          className: '!bg-content2 !text-foreground',
          duration: 10000.000
        }}>
          {(t) => <ToastBar toast={t}>
            {({ icon, message }) =>
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            }
          </ToastBar>}
        </Toaster>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
