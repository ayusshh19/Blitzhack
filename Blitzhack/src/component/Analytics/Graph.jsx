import React from "react";
import { Card, Group, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import { IconPigMoney, IconCalendarTime, IconLeaf } from "@tabler/icons-react";

const chartData = [
  {
    title: "Avg Saving per Week",
    icon: IconPigMoney,
    color: "green",
    type: "line",
    data: [
      { week: "W1", Steel: 900, Plastic: 600 },
      { week: "W2", Steel: 950, Plastic: 700 },
      { week: "W3", Steel: 1600, Plastic: 1100 },
      { week: "W4", Steel: 1800, Plastic: 1300 },
      { week: "W5", Steel: 1900, Plastic: 1400 },
    ],
    xKey: "week",
    yKeys: ["Steel", "Plastic"],
    annotation: {
      at: "W2",
      label: "Quotation Integration",
    },
  },
  {
    title: "Avg Aging to Complete Delivery",
    icon: IconCalendarTime,
    color: "orange",
    type: "bar",
    data: [
      { month: "Jan", days: 9 },
      { month: "Feb", days: 7 },
      { month: "Mar", days: 6 },
      { month: "Apr", days: 5 },
      { month: "May", days: 6 },
    ],
    xKey: "month",
    yKeys: ["days"],
  },
  {
    title: "Avg ESG Score Improvement",
    icon: IconLeaf,
    color: "teal",
    type: "area",
    data: [
      { month: "Jan", ESG: 58 },
      { month: "Feb", ESG: 62 },
      { month: "Mar", ESG: 68 },
      { month: "Apr", ESG: 73 },
      { month: "May", ESG: 78 },
    ],
    xKey: "month",
    yKeys: ["ESG"],
  },
];

const ChartCard = ({ chart }) => {
  const theme = useMantineTheme();

  const getChartComponent = () => {
    switch (chart.type) {
      case "bar":
        return (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.yKeys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                fill={theme.colors[chart.color][idx * 2 + 5] || "#8884d8"}
              />
            ))}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.yKeys.map((key, idx) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={theme.colors[chart.color][idx * 2 + 5] || "#82ca9d"}
                fill={theme.colors[chart.color][idx * 2 + 3] || "#82ca9d"}
              />
            ))}
          </AreaChart>
        );

      case "line":
      default:
        return (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chart.yKeys.map((key, idx) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={theme.colors[chart.color][idx * 2 + 5] || "#000"}
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            ))}
            {chart.annotation && (
              <ReferenceLine
                x={chart.annotation.at}
                stroke="gray"
                strokeDasharray="4 4"
              >
                <Label
                  value={chart.annotation.label}
                  position="top"
                  fill="gray"
                  fontSize={12}
                />
              </ReferenceLine>
            )}
          </LineChart>
        );
    }
  };

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      p="md"
      style={{
        height: "100%",
        minWidth: 280,
        maxWidth: 320,
        transition: "transform 0.2s ease",
        cursor: "pointer",
        marginBottom: "1.5rem",
        flex: "0 0 auto",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Group mb="xs">
        <ThemeIcon variant="light" radius="xl" size="md" color={chart.color}>
          <chart.icon size="1.2rem" />
        </ThemeIcon>
        <Title order={6}>{chart.title}</Title>
      </Group>

      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          {getChartComponent()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default function ESGAnalytics() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        padding: "1rem 0",
      }}
    >
      {chartData.map((chart, idx) => (
        <ChartCard key={idx} chart={chart} />
      ))}
    </div>
  );
}
