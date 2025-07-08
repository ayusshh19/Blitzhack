import { useState } from "react";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import classes from "../../assets/sidebar/NavbarLinksGroup.module.css";
import { useNavigate } from "react-router-dom";

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  isroot,
}) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();

  const items = Array.isArray(links) ? (
    links.map((subLink) => (
      <Text
        component="a"
        key={subLink.label}
        className={classes.link}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          navigate(subLink.link);
        }}
      >
        {subLink.label}
      </Text>
    ))
  ) : isroot ? (
    <Text
      component="a"
      className={classes.link}
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        navigate(link);
      }}
    >
      {label}
    </Text>
  ) : null;

  return (
    <>
      <UnstyledButton
        onClick={(e) => {
          if (isroot && link) {
            e.preventDefault();
            navigate(link);
          } else if (hasLinks) {
            setOpened((o) => !o);
          }
        }}
        className={classes.control}
        px="md"
        py="sm"
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30} mr="md">
              <Icon size={18} />
            </ThemeIcon>
            <Box>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}
