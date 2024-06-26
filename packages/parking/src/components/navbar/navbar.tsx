import { Link, Modal, ModalContent, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure } from "@nextui-org/react";
import clsx from 'clsx';
import React from "react";
import AuthButton from "../buttons/AuthButton.client";
import Show from "../common/Show";
import { Content as LoginContent } from "../login/content";
import { PlatformDropdown } from "../sidebar/platform-dropdown";
import { BurguerButton } from "./burguer-button";
import { DarkModeSwitch } from "./darkmodeswitch";

export interface NavbarProps {
  children: React.ReactNode;
  hideLogin?: boolean;
  darkOnly?: boolean;
}

export const NavbarWrapper = ({ children, hideLogin, darkOnly }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenLogin = () => {
    // onOpen();
    // signIn("credentials");
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        className={clsx("w-full bg-content1 md:bg-transparent md:backdrop-blur-none", darkOnly !== false && "dark")}
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden !grow-0 min-w-[28px]">
          <BurguerButton />
        </NavbarContent>
        <NavbarBrand className="w-full grow-1">
          <PlatformDropdown classNames={{
            logo: "border-none bg-transparent w-[58px] h-[58px]",
            logoWrapper: "gap-1"
          }} />
          {/* <a href="/">
            <img className="h-[40px]" src="/images/PARKING_LOGO.png" />
          </a> */}
        </NavbarBrand>
        {/* <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent> */}
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
            <Link href="/rent-out-space" color="foreground">Rent out your space</Link>
          </NavbarItem>
          <Show>
            <Show.When isTrue={!hideLogin}>
              <NavbarItem >
                <AuthButton />
              </NavbarItem>
            </Show.When>
          </Show>

          <NavbarItem className="max-md:hidden" >
            <DarkModeSwitch />
          </NavbarItem>

          {/* <Link
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          {/* <NavbarContent>
            <UserDropdown />
          </NavbarContent> */}
        </NavbarContent>
      </Navbar>
      {children}

      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          <LoginContent closeModal={onClose} />
        </ModalContent>
      </Modal>
    </div>
  );
};
