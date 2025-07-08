import {
  Avatar,
  Badge,
  Box,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconShip,
  IconTruck,
  IconBuildingFactory,
  IconHome,
  IconTrain,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";

// Icon mapping
const iconMap = {
  supplier: IconShip,
  factory: IconBuildingFactory,
  warehouse: IconTruck,
  customer: IconHome,
  train: IconTrain,
};

const statusColors = {
  completed: "green",
  "in-progress": "yellow",
  pending: "gray",
};

export default function OrderTracking() {
  const { orderId } = useParams();

  const trackingData = {
    orderId,
    material: "Norton Graphene Coating -50ml set",
    journey: [
      {
        type: "parallel",
        stages: [
          {
            stage: "Raw Supplier A",
            location: "Shanghai",
            transport: "Sea",
            note: "Graphene shipped",
            icon: "supplier",
            status: "completed",
          },
          {
            stage: "Raw Supplier B",
            location: "Gujarat",
            transport: "Rail",
            note: "Binder delayed",
            icon: "train",
            status: "completed",
          },
          {
            stage: "Raw Supplier B",
            location: "Gujarat",
            transport: "Rail",
            note: "Binder delayed",
            icon: "train",
            status: "completed",
          },
        ],
      },
      {
        type: "linear",
        stage: "Factory",
        location: "BNR Factory, Bangalore",
        transport: "Truck",
        note: "Materials blending",
        icon: "factory",
        status: "completed",
      },
      {
        type: "linear",
        stage: "Warehouse",
        location: "Kolar DC",
        transport: "Van",
        note: "Awaiting shipment",
        icon: "warehouse",
        status: "in-progress",
      },
      {
        type: "linear",
        stage: "Warehouse",
        location: "Kolar DC",
        transport: "Truck",
        note: "Awaiting shipment",
        icon: "warehouse",
        status: "pending",
      },
      {
        type: "linear",
        stage: "Customer",
        location: "Hyderabad",
        transport: "Van",
        note: "Not yet dispatched",
        icon: "customer",
        status: "pending",
      },
    ],
  };

  return (
    <Box p="lg">
      <Text fw={700} size="xl" mb="xs">
        Order Tracking: #{trackingData.orderId}
      </Text>
      <Text size="sm" c="dimmed" mb="lg">
        Material: {trackingData.material}
      </Text>

      <ScrollArea type="always" offsetScrollbars>
        <Group spacing={40} align="flex-start" noWrap>
          {trackingData.journey.map((step, index) => {
            if (step.type === "parallel") {
              return (
                <Group key={index} spacing={24} align="flex-start" noWrap>
                  {step.stages.map((s, idx) => {
                    const Icon = iconMap[s.icon];
                    const color = statusColors[s.status];
                    const isStuck = s.status === "in-progress";
                    const isPending = s.status === "pending";

                    return (
                      <Stack
                        key={idx}
                        align="center"
                        spacing={4}
                        style={{ opacity: isPending ? 0.4 : 1 }}
                      >
                        <Avatar color={color} size={36} radius="xl">
                          <Icon size={18} />
                        </Avatar>
                        <Text size="xs" fw={500} ta="center">
                          {s.stage}
                        </Text>
                        <Badge variant="light" color="gray" size="xs">
                          Source
                        </Badge>
                        <Text size="xs" c="dimmed" ta="center">
                          {s.location}
                        </Text>
                        <Text size="xs">🚚 {s.transport}</Text>
                        <Card
                          withBorder
                          radius="sm"
                          p="xs"
                          shadow="xs"
                          bg={isStuck ? "yellow.0" : "gray.0"}
                          maw={180}
                        >
                          <Text size="xs">{s.note}</Text>
                        </Card>
                        {isStuck && (
                          <Badge color="yellow" size="xs" mt={4}>
                            In Transit (Delayed)
                          </Badge>
                        )}
                      </Stack>
                    );
                  })}
                  <Box
                    style={{
                      height: 2,
                      width: 40,
                      background: "#adb5bd",
                      alignSelf: "center",
                    }}
                  />
                </Group>
              );
            } else {
              const Icon = iconMap[step.icon];
              const color = statusColors[step.status];
              const isPending = step.status === "pending";
              const isStuck = step.status === "in-progress";

              return (
                <Group key={index} spacing={0} align="center" noWrap>
                  <Stack
                    align="center"
                    spacing={4}
                    style={{ opacity: isPending ? 0.4 : 1, maxWidth: 160 }}
                  >
                    <Avatar color={color} size={36} radius="xl">
                      <Icon size={18} />
                    </Avatar>
                    <Text size="xs" fw={500} ta="center">
                      {step.stage}
                    </Text>
                    {index === trackingData.journey.length - 1 && (
                      <Badge variant="light" color="blue" size="xs">
                        Destination
                      </Badge>
                    )}
                    <Text size="xs" c="dimmed" ta="center">
                      {step.location}
                    </Text>
                    <Text size="xs">🚚 {step.transport}</Text>
                    <Card
                      withBorder
                      radius="sm"
                      p="xs"
                      shadow="xs"
                      bg={isStuck ? "yellow.0" : "gray.0"}
                      maw={180}
                    >
                      <Text size="xs">{step.note}</Text>
                    </Card>
                    {isStuck && (
                      <Badge color="yellow" size="xs" mt={4}>
                        In Transit (Stuck)
                      </Badge>
                    )}
                  </Stack>
                  {index !== trackingData.journey.length - 1 && (
                    <Box
                      style={{
                        height: 2,
                        width: 40,
                        background: "#74c0fc",
                        margin: "0 12px",
                      }}
                    />
                  )}
                </Group>
              );
            }
          })}
        </Group>
      </ScrollArea>
    </Box>
  );
}
