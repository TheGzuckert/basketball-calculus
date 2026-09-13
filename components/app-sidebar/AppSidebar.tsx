"use client";

import { usePathname, useRouter } from "next/navigation";
import { BookOpenIcon, HouseIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Jogar", href: "/", icon: HouseIcon },
  { title: "Aprender", href: "/aprender", icon: BookOpenIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar variant="floating" collapsible="offcanvas" className="top-6 h-fit! inset-y-auto!">
      <SidebarContent className="overflow-visible">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      onClick={() => router.push(item.href)}
                      className="rounded-full data-active:bg-primary data-active:text-primary-foreground hover:data-active:bg-primary hover:data-active:text-primary-foreground"
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
