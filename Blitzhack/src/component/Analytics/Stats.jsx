import React from "react";
import {
  Card,
  Text,
  Group,
  SimpleGrid,
  Badge,
  ThemeIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";
import {
  IconPackage,
  IconClockHour10,
  IconCheck,
  IconTruck,
  IconStar,
} from "@tabler/icons-react";
import CountUp from "react-countup";

const statData = [
  {
    title: "Material Requests",
    icon: IconPackage,
    color: "blue",
    value: 128,
    growth: "+12%",
  },
  {
    title: "Pending Quotations",
    icon: IconClockHour10,
    color: "orange",
    value: 47,
    growth: "-8%",
  },
  {
    title: "Deals Approved",
    icon: IconCheck,
    color: "green",
    value: 93,
    growth: "+18%",
  },
  {
    title: "Transport Delays",
    icon: IconTruck,
    color: "red",
    value: 16,
    growth: "+5%",
  },
];

export default function StatsOverview() {
  const theme = useMantineTheme();

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl" my="xl">
      {statData.map((stat, idx) => (
        <Card
          key={idx}
          withBorder
          radius="xl"
          shadow="lg"
          p="xl"
          style={{
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = theme.shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = theme.shadows.md;
          }}
        >
          <Text size="sm" c="dimmed" fw={500} transform="uppercase" mb={4}>
            {stat.title}
          </Text>

          <Text fw={800} size="2.2rem" lh={1.2}>
            {stat.isText ? (
              stat.value
            ) : (
              <CountUp end={stat.value} duration={1.2} separator="," />
            )}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}
