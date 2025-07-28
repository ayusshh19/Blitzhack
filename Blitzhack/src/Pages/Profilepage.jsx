import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  ScrollArea,
  Table,
  Text,
  Title,
  Progress,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconTruck,
  IconPackage,
  IconCertificate,
  IconMapPin,
  IconLeaf,
  IconUsers,
  IconCheck,
  IconAlertTriangle,
  IconClock,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Badge for status cells
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: { color: "teal", icon: <IconCheck size={14} /> },
    Pending: { color: "yellow", icon: <IconClock size={14} /> },
    "Pending Review": { color: "orange", icon: <IconClock size={14} /> },
    Delivered: { color: "blue", icon: <IconCheck size={14} /> },
    "In Transit": { color: "cyan", icon: <IconTruck size={14} /> },
    Delayed: { color: "red", icon: <IconAlertTriangle size={14} /> },
    default: { color: "gray", icon: null },
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <Badge
      leftSection={
        config.icon && (
          <ThemeIcon variant="transparent" color={config.color} size="xs">
            {config.icon}
          </ThemeIcon>
        )
      }
      color={config.color}
      variant="light"
      radius="sm"
    >
      {status}
    </Badge>
  );
};

const statusTypes = new Set([
  "Active",
  "Pending",
  "Pending Review",
  "Delivered",
  "In Transit",
  "Delayed",
]);

const actionTypes = ["View details", "Track shipment"];

const roleContent = {
  supplier: {
    title: "Supplier Overview",
    sections: [
      {
        icon: IconPackage,
        title: "Materials Supplied",
        content: "Iron Ore, Bauxite",
        stats: [
          { label: "Monthly Volume", value: "12,500 tons" },
          { label: "Quality Rating", value: "4.8/5" },
        ],
      },
      {
        icon: IconMapPin,
        title: "Material Origin",
        content: "Jharkhand, India (Lat: 23.6, Long: 85.2)",
        mapLink: "View on map",
      },
      {
        icon: IconCertificate,
        title: "Compliance Status",
        list: [
          "ISO 14001 Certified",
          "REACH Compliant",
          "Green Mining Certified",
        ],
        progress: { label: "Compliance Score", value: 92 },
      },
      {
        icon: IconLeaf,
        title: "Sustainability Metrics",
        content: "CO₂ per ton: 2.3kg • Blockchain ID: #x4f3…12a",
        emissions: [
          { label: "Scope 1", value: 1.2 },
          { label: "Scope 2", value: 0.8 },
          { label: "Scope 3", value: 0.3 },
        ],
      },
    ],
  },
  customer: {
    title: "Customer Dashboard",
    sections: [
      {
        icon: IconPackage,
        title: "Order Tracking",
        isTable: true,
        table: {
          headers: ["Order ID", "Material", "Status", "ETA", "Actions"],
          rows: [
            ["#3210", "Iron Ore", "Delivered", "Jul 22, 2025", "View details"],
            [
              "#3221",
              "Bauxite",
              "In Transit",
              "Jul 28, 2025",
              "Track shipment",
            ],
          ],
        },
      },
      {
        icon: IconCertificate,
        title: "Supplier Trust Level",
        content: "All suppliers verified • Avg Rating: 4.8★",
        rating: 4.8,
      },
      {
        icon: IconLeaf,
        title: "Sustainability Impact",
        content:
          "Your material footprint is 11.5 kg CO₂/year (12% below industry avg)",
        improvement: 12,
      },
    ],
  },
  source_manager: {
    title: "Sourcing Overview",
    sections: [
      {
        icon: IconUsers,
        title: "Supplier Network",
        isTable: true,
        table: {
          headers: [
            "Supplier",
            "Status",
            "Certifications",
            "Rating",
            "Last Audit",
          ],
          rows: [
            ["IronBridge Ltd", "Active", "ISO 9001, ESG", "4.9", "Jun 2025"],
            [
              "EcoMetals",
              "Pending Review",
              "Awaiting REACH",
              "4.2",
              "May 2025",
            ],
            ["GreenMinerals Co", "Active", "ISO 14001", "4.7", "Jul 2025"],
          ],
        },
      },
      {
        icon: IconCertificate,
        title: "Compliance Dashboard",
        content: "87% suppliers compliant • 2 flagged for review",
        stats: [
          { label: "Fully Compliant", value: "87%", color: "teal" },
          { label: "Partial Compliance", value: "9%", color: "yellow" },
          { label: "Non-Compliant", value: "4%", color: "red" },
        ],
      },
    ],
  },
  delivery_manager: {
    title: "Logistics Center",
    sections: [
      {
        icon: IconTruck,
        title: "Active Shipments",
        isTable: true,
        table: {
          headers: [
            "Order #",
            "Material",
            "Status",
            "Location",
            "Next Checkpoint",
          ],
          rows: [
            ["#4502", "Iron Ore", "In Transit", "Pune", "Nagpur (ETA: 2h)"],
            ["#4503", "Copper", "Delivered", "Chennai", "Completed"],
            ["#4504", "Bauxite", "Delayed", "Mumbai", "Pune (ETA: 8h)"],
          ],
        },
      },
      {
        icon: IconLeaf,
        title: "Fleet Performance",
        content: "Avg. CO₂: 1.5 kg/shipment • Sustainable fleet: 64%",
        metrics: [
          { label: "On-Time Rate", value: "92%" },
          { label: "Damages", value: "0.8%" },
          { label: "Fuel Efficiency", value: "+7% YoY" },
        ],
      },
    ],
  },
  production_manager: {
    title: "Production Dashboard",
    sections: [
      {
        icon: IconPackage,
        title: "Material Inventory",
        isTable: true,
        table: {
          headers: [
            "Material",
            "Current Stock",
            "Daily Usage",
            "Days Remaining",
            "Status",
          ],
          rows: [
            ["Iron Ore", "1,250 tons", "85 tons/day", "14 days", "Active"],
            ["Bauxite", "850 tons", "45 tons/day", "18 days", "Active"],
            ["Copper", "320 tons", "22 tons/day", "14 days", "Low Stock"],
          ],
        },
      },
      {
        icon: IconLeaf,
        title: "Production Efficiency",
        content: "Overall equipment effectiveness: 82%",
        stats: [
          { label: "Quality Rate", value: "98.5%", color: "teal" },
          { label: "Performance", value: "83%", color: "yellow" },
          { label: "Availability", value: "84%", color: "blue" },
        ],
      },
      {
        icon: IconCertificate,
        title: "Quality Control",
        content: "Last batch quality metrics",
        list: [
          "99.2% purity standard met",
          "0.2% defect rate (target: <0.5%)",
          "All safety checks passed",
        ],
        progress: { label: "Quality Compliance", value: 98 },
      },
      {
        icon: IconUsers,
        title: "Team Performance",
        content: "Shift A productivity: 12% above target",
        metrics: [
          { label: "Output/Hour", value: "15.2 tons" },
          { label: "Waste Reduction", value: "8% YoY" },
          { label: "Safety Days", value: "142 days" },
        ],
      },
    ],
  },
};

export default function ProfilePage() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Ayush Shukla",
    email: "ayush@default.com",
    role: "supplier",
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
  };

  const navigate = useNavigate();

  const roleKey = user.role?.toLowerCase() || "supplier";
  const content = roleContent[roleKey];
  const tableSections = content?.sections.filter((s) => s.isTable);
  const nonTableSections = content?.sections.filter((s) => !s.isTable);

  return (
    <Container size="lg" py="xl">
      <Card shadow="sm" radius="lg" p="xl" withBorder>
        <Group mb="xl" gap="lg">
          <Avatar src={user.avatar} size={80} radius="xl" />
          <Box>
            <Title order={3}>{user.name}</Title>
            <Text c="dimmed" size="sm" mt={2}>
              {user.email}
            </Text>
            <Badge
              mt={8}
              color="blue"
              variant="light"
              size="md"
              radius="sm"
              px={8}
              style={{ textTransform: "capitalize" }}
            >
              {user.role}
            </Badge>
          </Box>
        </Group>

        <Divider my="md" color={theme.colors.gray[2]} />

        <Title order={2} mb="lg" style={{ fontWeight: 600 }}>
          {content?.title}
        </Title>

        {/* Render full-width table sections */}
        {tableSections.map((section, idx) => (
          <Paper key={idx} withBorder p="lg" radius="lg" shadow="xs" mb="xl">
            <Group mb="md" gap="sm" align="center" noWrap>
              <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                <section.icon size={20} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {section.title}
              </Text>
            </Group>
            {!isMobile ? (
              <ScrollArea>
                <Table
                  verticalSpacing="xl"
                  horizontalSpacing="xl"
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  borderColor="#eaeaea"
                  className="modern-table"
                >
                  <thead>
                    <tr>
                      {section.table.headers.map((header, i) => (
                        <th
                          key={i}
                          style={{
                            padding: "16px 24px",
                            backgroundColor: "#f8f9fa",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            fontSize: "0.85rem",
                          }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        style={{
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#f8f9fa",
                          },
                        }}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            style={{
                              padding: "16px 24px",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            {statusTypes.has(cell) ? (
                              <StatusBadge status={cell} />
                            ) : actionTypes.includes(cell) ? (
                              <Text
                                c="blue"
                                size="sm"
                                fw={500}
                                style={{
                                  cursor: "pointer",
                                  transition: "color 0.2s ease",
                                  "&:hover": {
                                    color: "#228be6",
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={() =>
                                  navigate(`/order/${row[0].replace("#", "")}`)
                                }
                              >
                                {cell}
                              </Text>
                            ) : (
                              <Text size="sm" c="dimmed">
                                {cell}
                              </Text>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ScrollArea>
            ) : (
              <Box>
                {section.table.rows.map((row, rIdx) => (
                  <Paper key={rIdx} withBorder radius="md" p="md" mb="sm">
                    {row.map((cell, cIdx) => (
                      <Box key={cIdx} mb="xs">
                        <Text size="xs" c="dimmed">
                          {section.table.headers[cIdx]}
                        </Text>
                        {statusTypes.has(cell) ? (
                          <StatusBadge status={cell} />
                        ) : actionTypes.includes(cell) ? (
                          <Text
                            c="blue"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              alert(`Action "${cell}" on row ${rIdx + 1}`)
                            }
                          >
                            {cell}
                          </Text>
                        ) : (
                          <Text fw={500} size="sm">
                            {cell}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        ))}

        <Grid gutter="xl">
          {nonTableSections.map((section, idx) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={idx}>
              <Paper withBorder p="lg" radius="lg" shadow="xs">
                <Group mb="md" gap="sm" align="center" noWrap>
                  <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                    <section.icon size={20} />
                  </ThemeIcon>
                  <Text fw={600} size="lg">
                    {section.title}
                  </Text>
                </Group>

                {section.content && (
                  <Text c="dimmed" size="sm" mb="md">
                    {section.content}
                  </Text>
                )}

                {section.list && (
                  <List
                    size="sm"
                    spacing="xs"
                    mt={4}
                    icon={
                      <ThemeIcon
                        variant="light"
                        color="teal"
                        size={20}
                        radius="sm"
                      >
                        <IconCheck size={14} />
                      </ThemeIcon>
                    }
                  >
                    {section.list.map((item, i) => (
                      <List.Item key={i}>{item}</List.Item>
                    ))}
                  </List>
                )}

                {section.progress && (
                  <Box mt="md">
                    <Group justify="space-between" mb={4}>
                      <Text size="sm" c="dimmed">
                        {section.progress.label}
                      </Text>
                      <Text size="sm" fw={500}>
                        {section.progress.value}%
                      </Text>
                    </Group>
                    <Progress
                      value={section.progress.value}
                      color={
                        section.progress.value > 90
                          ? "teal"
                          : section.progress.value > 70
                          ? "yellow"
                          : "orange"
                      }
                      size="sm"
                      radius="xl"
                    />
                  </Box>
                )}

                {section.stats && (
                  <Group mt="md" gap="sm">
                    {section.stats.map((stat, i) => (
                      <Paper
                        key={i}
                        p="sm"
                        withBorder
                        radius="md"
                        style={{ flex: 1 }}
                      >
                        <Text size="xs" c="dimmed">
                          {stat.label}
                        </Text>
                        <Text fw={600}>{stat.value}</Text>
                      </Paper>
                    ))}
                  </Group>
                )}

                {section.emissions && (
                  <Group mt="md" gap="sm">
                    {section.emissions.map((emission, i) => (
                      <Paper
                        key={i}
                        p="sm"
                        withBorder
                        radius="md"
                        style={{ flex: 1 }}
                      >
                        <Text size="xs" c="dimmed">
                          {emission.label}
                        </Text>
                        <Text fw={600}>{emission.value}</Text>
                      </Paper>
                    ))}
                  </Group>
                )}

                {section.metrics && (
                  <Group mt="md" gap="sm">
                    {section.metrics.map((metric, i) => (
                      <Paper
                        key={i}
                        p="sm"
                        withBorder
                        radius="md"
                        style={{ flex: 1 }}
                      >
                        <Text size="xs" c="dimmed">
                          {metric.label}
                        </Text>
                        <Text fw={600}>{metric.value}</Text>
                      </Paper>
                    ))}
                  </Group>
                )}

                {section.rating !== undefined && (
                  <Text mt="md" fw={600} size="xl" color="teal">
                    {section.rating} ★
                  </Text>
                )}

                {section.improvement !== undefined && (
                  <Text mt="md" c="green" fw={600}>
                    {section.improvement}% improvement
                  </Text>
                )}
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}
