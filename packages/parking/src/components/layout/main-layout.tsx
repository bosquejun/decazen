import React from "react";
import { NavbarWrapper } from "../navbar/navbar";


interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return <section className="flex">
        <NavbarWrapper>
            <main className="md:max-w-screen-xl min-w-[95%] md:min-w-[628px] xl:min-w-[1224px] self-center px-2 md:px-6">{children}</main>
        </NavbarWrapper>
    </section>;
};
