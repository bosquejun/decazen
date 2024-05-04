import React from "react";
import { NavbarWrapper } from "../navbar/navbar";


interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return <section className="flex">
        <NavbarWrapper>
            <main className="max-w-screen-lg self-center px-2 md:px-6">{children}</main>
        </NavbarWrapper>
    </section>;
};
