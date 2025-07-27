import { IconChevronRight, IconLogout, IconUser } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "../../assets/sidebar/UserButton.module.css";

export function UserButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleProfile = () => {
    navigate(`/profile`);
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Menu width={200} shadow="md" position="bottom-end" withArrow>
      <Menu.Target>
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
                Ayush.Shukla2@saint-gobain.com
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />} onClick={handleProfile}>
          View Profile
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
