import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../../assets/sidebar/UserButton.module.css";

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Ayush Shukla
          </Text>

          <Text c="dimmed" size="xs">
            Ayush.Shukla@saint-gobain.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
