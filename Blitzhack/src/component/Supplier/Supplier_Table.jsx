import {
  Avatar,
  Badge,
  Card,
  Collapse,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  ScrollArea,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function SupplierList({ suppliers }) {
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState({});

  const filteredSuppliers = Object.values(suppliers).filter((s) =>
    (s?.supplier ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollArea style={{ height: "calc(100vh-40px)" }} p="md">
      <TextInput
        icon={<IconSearch size={16} />}
        placeholder="Search supplier..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      {filteredSuppliers.map((s, index) => {
        const isOpen = opened[index];

        return (
          <Card
            key={index}
            withBorder
            shadow="sm"
            mb="sm"
            p="md"
            onClick={() =>
              setOpened((prev) => ({ ...prev, [index]: !prev[index] }))
            }
            style={{
              cursor: "pointer",
              transition: "0.2s",
              borderLeft: isOpen
                ? "4px solid #1c7ed6"
                : "4px solid transparent",
            }}
          >
            <Group position="apart" align="center">
              <Group spacing="md">
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  size={56}
                  radius="xl"
                  alt="Supplier logo"
                />
                <div>
                  <Text fw={500} size="md">
                    {s.supplier}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {s.city} | {s.location}
                  </Text>
                </div>
              </Group>
              <Group spacing="xs" ml="auto" align="flex-end">
                <Stack spacing={2} align="flex-end">
                  <Group spacing="xs">
                    <Text size="xs" c="dimmed">
                      Orders:
                    </Text>
                    <Badge color="gray" variant="outline" size="sm">
                      {s.orders.length}
                    </Badge>
                  </Group>

                  <Group spacing="xs">
                    <Text size="xs" c="dimmed">
                      Total:
                    </Text>
                    <Badge color="blue" size="sm" variant="light">
                      {s.currency}{" "}
                      {Math.round(s.totalOrderValue).toLocaleString()}
                    </Badge>
                  </Group>
                </Stack>
              </Group>
            </Group>

            <Collapse in={isOpen} mt="md">
              <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                  <tr>
                    <th>Order No.</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {s.orders.map((o, idx) => (
                    <tr key={idx}>
                      <td>{o.orderNumber}</td>
                      <td>{o.orderItem}</td>
                      <td>{o.description}</td>
                      <td>{o.quantity}</td>
                      <td>
                        {o.currency}{" "}
                        {parseFloat(o.orderValueLocal).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Collapse>
          </Card>
        );
      })}
    </ScrollArea>
  );
}
