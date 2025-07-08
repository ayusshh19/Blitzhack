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
  Button,
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
              <Card withBorder shadow="xs" radius="sm" p="lg" mt="lg">
                <Table
                  striped
                  highlightOnHover
                  verticalSpacing="lg" // More space between rows
                  fontSize="sm"
                  withColumnBorders
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", paddingLeft: "16px" }}>
                        Order No
                      </th>
                      <th style={{ textAlign: "left", paddingLeft: "16px" }}>
                        Item
                      </th>
                      <th style={{ textAlign: "left", paddingLeft: "16px" }}>
                        Description
                      </th>
                      <th style={{ textAlign: "left", paddingLeft: "16px" }}>
                        Qty
                      </th>
                      <th style={{ textAlign: "left", paddingLeft: "16px" }}>
                        Value
                      </th>
                      <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.orders.map((o, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: "left", padding: "12px 16px" }}>
                          {o.orderNumber}
                        </td>
                        <td style={{ textAlign: "left", padding: "12px 16px" }}>
                          {o.orderItem}
                        </td>
                        <td style={{ textAlign: "left", padding: "12px 16px" }}>
                          {o.description}
                        </td>
                        <td style={{ textAlign: "left", padding: "12px 16px" }}>
                          {o.quantity}
                        </td>
                        <td style={{ textAlign: "left", padding: "12px 16px" }}>
                          {o.currency}{" "}
                          {parseFloat(o.orderValueLocal).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                        <td
                          style={{ textAlign: "center", padding: "12px 16px" }}
                        >
                          <Group spacing="sm" position="center">
                            <Button
                              size="xs"
                              variant="outline"
                              color="blue"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/order/${o.orderNumber}`);
                              }}
                            >
                              Track
                            </Button>
                            <Button
                              size="xs"
                              variant="outline"
                              color="red"
                              onClick={() =>
                                console.log("Raise problem", o.orderNumber)
                              }
                            >
                              Raise Problem
                            </Button>
                          </Group>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Collapse>
          </Card>
        );
      })}
    </ScrollArea>
  );
}
