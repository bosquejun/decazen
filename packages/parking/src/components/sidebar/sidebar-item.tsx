import clsx from "clsx";
import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  classNames?: {
    base?: string;
    content?: string;
    itemWrapper?: string;
  }
}

export const SidebarItem = ({ icon, title, isActive, href = "", onClick, classNames }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      {...(onClick && { onClick })}
      className={clsx("text-default-900 active:bg-none max-w-full", classNames?.base)}
    >
      <div
        className={clsx("[&_svg_path]:stroke-[1.5] ",
          isActive
            ? "bg-primary/20 [&_svg_path]:stroke-primary-400 dark:[&_svg_path]:stroke-primary"
            : "hover:bg-default-200",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] "
          , classNames?.itemWrapper)}
        onClick={handleClick}
      >
        {icon}
        <span className={clsx("text-default-900", classNames?.content)}>{title}</span>
      </div>
    </NextLink>
  );
};
