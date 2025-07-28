import React from "react";
import {
  IconCalendarStats,
  IconGauge,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { Box, Group, ScrollArea } from "@mantine/core";
import Logo from "./Logo";
import "../../assets/sidebar/Navbar.css";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "";

  const allLinks = [
    {
      label: "Dashboard",
      icon: IconGauge,
      link: "/",
      isroot: true,
      roles: ["source_manager", "delivery_manager"],
    },
    {
      label: "Production UNIT",
      icon: IconGauge,
      link: "/production_dashboard",
      isroot: true,
      roles: ["production_manager"],
    },
    {
      label: "Supply Chain",
      icon: IconNotes,
      initiallyOpened: true,
      roles: ["source_manager", "delivery_manager", "production_manager"],
      links: [
        { label: "Material Tracking", link: "/supplier" },
        { label: "Raw Material Record", link: "/supplier/material" },
        { label: "Material Analytics", link: "/supplier/material_history" },
      ],
    },
    {
      label: "Customer",
      icon: IconCalendarStats,
      roles: ["customer", "delivery_manager"],
      links: [{ label: "Customer Request", link: "/customer/material" }],
    },
    {
      label: "Analytics",
      icon: IconPresentationAnalytics,
      link: "/user_supplier/analytics",
      isroot: true,
      roles: ["delivery_manager"],
    },
  ];

  const filteredLinks = allLinks.filter((item) =>
    item.roles.includes(userRole)
  );

  const links = filteredLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <nav className="navbar">
        <div className="header">
          <Group justify="space-between">
            <Logo style={{ width: 120 }} />
          </Group>
        </div>

        <ScrollArea className="links">
          <div className="links-inner">{links}</div>
        </ScrollArea>

        <div className="footer">
          <UserButton />
        </div>
      </nav>

      <Box style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
