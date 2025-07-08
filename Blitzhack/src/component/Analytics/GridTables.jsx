import React from "react";
import {
  Card,
  Text,
  Group,
  ThemeIcon,
  List,
  ScrollArea,
  Badge,
  Paper,
} from "@mantine/core";
import {
  IconTrendingUp,
  IconTruckDelivery,
  IconUser,
  IconUserCheck,
  IconClock,
  IconAlertTriangle,
} from "@tabler/icons-react";

const analyticsData = [
  {
    title: "Material Trends",
    icon: IconTrendingUp,
    color: "blue",
    type: "list",
    gridColumn: "span 2",
    items: [
      "Steel Sheets ↑ 15%",
      "Gyproc ↑ 11%",
      "Aluminium Rods ↓ 5%",
      "Glass Panels ↑ 9%",
      "Plastic Moulds ↑ 3%",
    ],
  },
  {
    title: "Transport Delays",
    icon: IconTruckDelivery,
    color: "red",
    type: "badge-group",
    gridColumn: "span 1",
    items: ["Shipment #A125", "Shipment #B302", "Shipment #X981"],
  },
  {
    title: "Top Approved Suppliers",
    icon: IconUserCheck,
    color: "teal",
    type: "list",
    gridColumn: "span 1",
    items: ["GreenChem", "Jindal", "Eastern Metals", "Abc", "Test"],
  },
  {
    title: "Delay Frequency",
    icon: IconClock,
    color: "orange",
    type: "stat-bar",
    gridColumn: "span 2",
    value: "3-4 Days",
    sub: "Avg. delay across suppliers",
  },
];

const CardLayout = ({ data }) => {
  return (
    <Card
      withBorder
      radius="lg"
      shadow="sm"
      p="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: "100%",
      }}
    >
      <Group>
        <ThemeIcon variant="light" size="lg" radius="xl" color={data.color}>
          <data.icon size="1.3rem" />
        </ThemeIcon>
        <Text fw={600}>{data.title}</Text>
      </Group>

      {data.type === "list" && (
        <Group wrap="wrap" spacing="xs" mt="xs">
          {data.items.map((item, i) => (
            <Badge key={i} color={data.color} variant="light" size="md">
              {item}
            </Badge>
          ))}
        </Group>
      )}

      {data.type === "badge-group" && (
        <Group spacing="xs" mt="sm" wrap="wrap">
          {data.items.map((item, i) => (
            <Badge key={i} color={data.color} variant="light">
              {item}
            </Badge>
          ))}
        </Group>
      )}

      {data.type === "count" && (
        <>
          <Text fw={700} size="2rem">
            {data.value}
          </Text>
          <Text size="sm" c="dimmed">
            {data.sub}
          </Text>
        </>
      )}

      {data.type === "stat" && (
        <>
          <Text fw={600} size="xl">
            {data.value}
          </Text>
          <Text size="sm" c="dimmed">
            {data.sub}
          </Text>
        </>
      )}

      {data.type === "stat-bar" && (
        <Paper bg="gray.1" p="md" radius="md">
          <Text fw={600}>{data.value}</Text>
          <Text size="sm" c="dimmed">
            {data.sub}
          </Text>
          <div
            style={{
              backgroundColor: "#ff922b33",
              height: "8px",
              borderRadius: "4px",
              marginTop: "8px",
              width: "70%",
            }}
          />
        </Paper>
      )}
    </Card>
  );
};

export default function CustomAnalyticsGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
      }}
    >
      {analyticsData.map((data, i) => (
        <div key={i} style={{ gridColumn: data.gridColumn }}>
          <CardLayout data={data} />
        </div>
      ))}
    </div>
  );
}
