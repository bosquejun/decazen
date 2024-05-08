import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { DarkModeSwitch } from "./darkmodeswitch";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full bg-content1"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">Decazen</p>
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
          <NavbarItem>
            <Link href="#" color="foreground">Rent out your space</Link>
          </NavbarItem>
          <NavbarItem className="max-md:hidden">
            <Button as={Link} color="primary" href="#" variant="shadow">
              Login as Parking Owner
            </Button>
          </NavbarItem>

          <NavbarItem >
            <DarkModeSwitch iconMode />
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
    </div>
  );
};
