import { Chip, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import clsx from 'clsx';
import React from "react";
import { BurguerButton } from "./burguer-button";

export interface NavbarProps {
    children: React.ReactNode;
    hideLogin?: boolean;
    darkOnly?: boolean;
}

export const DashboardNavbarWrapper = ({ children }: NavbarProps) => {

    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Navbar
                className={clsx("w-full bg-content1 bg-transparent backdrop-blur-none")}
                classNames={{
                    wrapper: "w-full max-w-full",
                }}
            >
                <NavbarContent className="md:hidden !grow-0 min-w-[28px]">
                    <BurguerButton />
                </NavbarContent>
                <NavbarItem />
                <NavbarContent
                    justify="end"
                    className="w-fit data-[justify=end]:flex-grow-0"
                >
                    {/* <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div> */}

                    {/* <NotificationsDropdown /> */}

                    {/* <div className="max-md:hidden">
            <SupportIcon />
          </div> */}

                    <NavbarItem className="max-md:hidden" >
                        <Chip radius="sm" variant="faded" className="bg-blue-500/20 dark:bg-blue-400/20 text-blue-500 dark:text-blue-400 font-[400]" classNames={{
                            content: "font-[500]"
                        }}>Free Plan</Chip>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}

        </div>
    );
};
