"use client";
import Toast from "@/components/common/Toast";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { ModalRoutedProvider } from "./modal-routed.provider";
import QueryProvider from "./query.provider";
import AuthSessionProvider from "./session.provider";
import { UserProvider } from "./user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        <AuthSessionProvider>
          <UserProvider>
            <QueryProvider>
              <ModalRoutedProvider>
                {children}
              </ModalRoutedProvider>

            </QueryProvider>
          </UserProvider>
        </AuthSessionProvider>

        <Toast />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
