import React from "react";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { Box, Code, Group, ScrollArea } from "@mantine/core";
import Logo from "./Logo";
import "../../assets/sidebar/Navbar.css";
import { LinksGroup } from "./NavbarLinksGroup";
import { UserButton } from "./UserButton";
import { Outlet } from "react-router-dom";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/", isroot: true },
  {
    label: "Supplier",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Supplier Listing", link: "/supplier" },
      { label: "Material Quotation", link: "/supplier/material" },
      { label: "Material Analytics", link: "/supplier/material_history" },
    ],
  },
  {
    label: "Customer",
    icon: IconCalendarStats,
    links: [{ label: "Customer Request", link: "/customer/material" }],
  },
  {
    label: "Analytics",
    icon: IconPresentationAnalytics,
    link: "/user_supplier/analytics",
    isroot: true,
  },
];

export default function Sidebar() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <nav className="navbar">
        <div className="header">
          <Group justify="space-between">
            <Logo style={{ width: 120 }} />
            {/* <Code fw={700}>Supplier Dashboard</Code> */}
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
