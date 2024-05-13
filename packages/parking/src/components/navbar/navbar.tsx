import { Button, Link, Modal, ModalContent, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure } from "@nextui-org/react";
import { LoginCurve } from "iconsax-react";
import React from "react";
import { Icon } from "../icons/Icon";
import { Content as LoginContent } from "../login/content";
import { BurguerButton } from "./burguer-button";
import { DarkModeSwitch } from "./darkmodeswitch";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenLogin = () => {
    onOpen();
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        // isBordered
        className="dark w-full bg-content1 bg-transparent backdrop-blur-none"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden !grow-0 min-w-[28px]">
          <BurguerButton />
        </NavbarContent>
        <NavbarBrand className="w-full grow-1">
          <a href="/">
            <img className="h-[40px]" src="/images/PARKING_LOGO.png" />
          </a>
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
          <NavbarItem >
            <Button className="hidden md:flex" color="primary" onClick={handleOpenLogin} variant="shadow">
              <Icon as={LoginCurve} size="24" className="text-black" /> Login as Parking Owner
            </Button>
            <Button isIconOnly className="flex md:hidden" onClick={handleOpenLogin} color="primary" variant="light">
              <Icon as={LoginCurve} size="24" />
            </Button>
          </NavbarItem>

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
          <LoginContent />
        </ModalContent>
      </Modal>
    </div>
  );
};
