import { useUserContext } from "@/providers/user.provider";
import { Avatar, Skeleton, Tooltip } from "@nextui-org/react";
import { Driving, Element4, Home2, Note1, Profile2User } from "iconsax-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import LogoutButton from "../buttons/LogoutButton";
import Show from "../common/Show";
import { useSidebarContext } from "../layout/layout-context";
import { DarkModeSwitch } from "../navbar/darkmodeswitch";
import { PlatformDropdown } from "./platform-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const { userData, isAuthenticated } = useUserContext();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  const isActive = (path?: string) => path ? pathname.startsWith(path) : false;

  const sidebar_items = useMemo(() => {


    const items = [{
      title: "Home Page",
      icon: <Home2 />,
      isActive: false,
      href: "/"
    }, {
      title: "Main Menu",
      items: [
        {
          title: "Dashboard",
          icon: <Element4 className="[&_path]:!fill-none" />,
          href: "/dashboard"
        },
        {
          title: "Parking Spaces",
          icon: <Driving />,
          href: "/dashboard/parking-spaces"
        },
        {
          title: "Rentals",
          icon: <Note1 />,
          href: "/dashboard/rentals"
        },

        {
          title: "Customers",
          icon: <Profile2User />,
          href: "/dashboard/customers"
        },
        // , {
        //   title: "Reports",
        //   icon: <ReportsIcon />,
        //   isActive: isActive("/reports"),
        // }
      ]
    }
      // , {
      //   title: "General",
      //   items: [{
      //     title: "Developers",
      //     icon: <DevIcon />,
      //     isActive: isActive("/developers"),
      //   }, {
      //     title: "View Test Data",
      //     icon: <ViewIcon />,
      //     isActive: isActive("/view"),
      //   }, {
      //     title: "Settings",
      //     icon: <SettingsIcon />,
      //     isActive: isActive("/settings"),
      //   },]
      // }, {
      //   title: "Updates",
      //   items: [{
      //     title: "Changelog",
      //     icon: <ChangeLogIcon />,
      //     isActive: isActive("/changelog"),
      //   }]
      // }
    ];

    return items;
  }, [pathname]);

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <PlatformDropdown classNames={{
            logo: "w-[55px] h-[55px]  bg-white dark:bg-black"
          }} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {sidebar_items.map((item, index) => (
                  item.items ? (<SidebarMenu key={index} title={item.title}>
                    {item.items?.map((subitem, subindex) => (
                      <SidebarItem
                        key={subindex}
                        title={subitem.title}
                        icon={subitem.icon}
                        isActive={isActive(subitem?.href)}
                        href={subitem.href}
                      />
                    ))}
                  </SidebarMenu>) : (<SidebarItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    isActive={item.isActive ?? isActive(item?.["href"])}
                    href={item.href} />
                  )
                ))}
              </div>
            </div>
            {/* <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>

          <div className="flex flex-col  pt-16  md:pt-10 gap-4">
            <div className="flex flex-col gap-6">
              <LogoutButton type="link" />
            </div>
            <div className={Sidebar.Footer()}>

              <div className="w-full flex justify-between">
                <DarkModeSwitch />
              </div>
              {/* <Tooltip content={"Settings"} color="primary">
  <div className="max-w-fit">
    <SettingsIcon />
  </div>
</Tooltip>
<Tooltip content={"Adjustments"} color="primary">
  <div className="max-w-fit">
    <FilterIcon />
  </div>
</Tooltip> */}
              <div>
                <Show>
                  <Show.When isTrue={isAuthenticated}>
                    <Tooltip content={"Profile"} color="primary">
                      <Avatar
                        src={`https://robohash.org/${userData?.email}?gravatar=yes&set=set5`}
                        size="md"
                      />
                    </Tooltip>
                  </Show.When>
                  <Show.Else>
                    <Skeleton className="flex rounded-full w-[40px] h-[40px]" />
                  </Show.Else>
                </Show>

              </div>

            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
