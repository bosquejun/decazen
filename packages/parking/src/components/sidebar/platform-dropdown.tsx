"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import clsx from 'clsx';
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface App {
  name: string;
  appName: string;
  logo: React.ReactNode;
}

export const PlatformDropdown = ({ classNames }: {
  classNames?: {
    logo?: string;
    logoWrapper?: string;
  }
}) => {
  const [company, setCompany] = useState<App>({
    name: "Decazen",
    appName: "Parking",
    logo: <img src="/images/logo-parking.png" />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className={clsx("flex items-center gap-2", classNames?.logoWrapper)}>
          <div className={clsx("w-[50px] h-[50px] flex items-center justify-center border rounded-md border-default-100", classNames?.logo)}>
            <img src="/images/logo-parking.png" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[1.40rem] font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              Decazen
            </h3>
            <span className="text-sm font-medium text-default-500">
              Parking
            </span>
          </div>
          <div className="ml-1"><BottomIcon /></div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          if (e === "1") {
            setCompany({
              name: "Facebook",
              appName: "San Fransico, CA",
              logo: <AcmeIcon />,
            });
          }
          if (e === "2") {
            setCompany({
              name: "Instagram",
              appName: "Austin, Tx",
              logo: <AcmeLogo />,
            });
          }
          if (e === "3") {
            setCompany({
              name: "Twitter",
              appName: "Brooklyn, NY",
              logo: <AcmeIcon />,
            });
          }
          if (e === "4") {
            setCompany({
              name: "Acme Co.",
              appName: "Palo Alto, CA",
              logo: <AcmeIcon />,
            });
          }
        }}
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Applications">
          <DropdownItem
            key="1"
            startContent={<AcmeIcon />}
            description="San Fransico, CA"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            Facebook
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<AcmeLogo />}
            description="Austin, Tx"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            Instagram
          </DropdownItem>
          <DropdownItem
            key="3"
            startContent={<AcmeIcon />}
            description="Brooklyn, NY"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            Twitter
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<AcmeIcon />}
            description="Palo Alto, CA"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
          >
            Acme Co.
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
