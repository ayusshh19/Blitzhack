import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  Tabs,
  Progress,
  Button,
  Tooltip,
  Modal,
} from "@mantine/core";
import {
  IconShip,
  IconTruck,
  IconBuildingFactory,
  IconHome,
  IconTrain,
  IconCheck,
  IconAlertCircle,
  IconExternalLink,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";

// Data for batches
const batches = {
  batch1: {
    orderId: "1001",
    material: "Norton Graphene Coating -50ml set",
    journey: [
      {
        type: "parallel",
        stages: [
          {
            stage: "Raw Supplier A",
            location: "Shanghai",
            transport: "Sea",
            note: "Graphene shipped on 08-07-2025",
            icon: "supplier",
            status: "completed",
            lastUpdated: "2025-07-08 15:23",
            verified: true,
            blockchainTx: "0x123abc...",
          },
          {
            stage: "Raw Supplier B",
            location: "Gujarat",
            transport: "Rail",
            note: "Binder shipped on 08-07-2025",
            icon: "train",
            status: "completed",
            lastUpdated: "2025-07-08 14:00",
            verified: false,
            blockchainTx: null,
          },
          {
            stage: "Raw Supplier C",
            location: "Gujarat",
            transport: "Rail",
            note: "Binder shipped on 08-07-2025",
            icon: "train",
            status: "completed",
            lastUpdated: "2025-07-08 14:05",
            verified: true,
            blockchainTx: "0x789def...",
          },
        ],
      },
      {
        type: "linear",
        stage: "Factory",
        location: "BNR Factory, Bangalore",
        transport: "Truck",
        note: "Materials blending on 09-07-2025",
        icon: "factory",
        status: "completed",
        lastUpdated: "2025-07-09 10:12",
        verified: true,
        blockchainTx: "0xabc456...",
      },
      {
        type: "linear",
        stage: "Warehouse",
        location: "Kolar DC",
        transport: "Van",
        note: "Shipped for Delivery",
        icon: "warehouse",
        status: "in-progress",
        lastUpdated: "2025-07-10 09:00",
        verified: false,
        blockchainTx: null,
        alert:
          "Shipment delayed due to weather conditions. Expected to resume in 2 days.",
      },
      {
        type: "linear",
        stage: "Warehouse",
        location: "Kolar DC",
        transport: "Truck",
        note: "Awaiting shipment",
        icon: "warehouse",
        status: "pending",
        lastUpdated: null,
        verified: false,
        blockchainTx: null,
      },
      {
        type: "linear",
        stage: "Customer",
        location: "Hyderabad",
        transport: "Van",
        note: "Not yet dispatched",
        icon: "customer",
        status: "pending",
        lastUpdated: null,
        verified: false,
        blockchainTx: null,
      },
    ],
  },

  batch2: {
    orderId: "1002",
    material: "Norton Nano Coating -100ml set",
    journey: [
      {
        type: "parallel",
        stages: [
          {
            stage: "Raw Supplier X",
            location: "Mumbai",
            transport: "Sea",
            note: "Nano particles shipped on 10-07-2025",
            icon: "supplier",
            status: "completed",
            lastUpdated: "2025-07-10 16:00",
            verified: true,
            blockchainTx: "0xaaa111...",
          },
          {
            stage: "Raw Supplier Y",
            location: "Delhi",
            transport: "Rail",
            note: "Binder shipped on 10-07-2025",
            icon: "train",
            status: "in-progress",
            lastUpdated: "2025-07-10 18:00",
            verified: false,
            blockchainTx: null,
            alert: "Delay due to customs clearance.",
          },
        ],
      },
      {
        type: "linear",
        stage: "Factory",
        location: "BNR Factory, Bangalore",
        transport: "Truck",
        note: "Processing on 11-07-2025",
        icon: "factory",
        status: "pending",
        lastUpdated: null,
        verified: false,
        blockchainTx: null,
      },
      {
        type: "linear",
        stage: "Warehouse",
        location: "Kolar DC",
        transport: "Van",
        note: "Not yet shipped",
        icon: "warehouse",
        status: "pending",
        lastUpdated: null,
        verified: false,
        blockchainTx: null,
      },
      {
        type: "linear",
        stage: "Customer",
        location: "Chennai",
        transport: "Van",
        note: "Not yet dispatched",
        icon: "customer",
        status: "pending",
        lastUpdated: null,
        verified: false,
        blockchainTx: null,
      },
    ],
  },
};

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

function calculateCompletion(journey) {
  let totalSteps = 0;
  let completedSteps = 0;

  journey.forEach((step) => {
    if (step.type === "parallel") {
      totalSteps += step.stages.length;
      completedSteps += step.stages.filter(
        (s) => s.status === "completed"
      ).length;
    } else {
      totalSteps += 1;
      if (step.status === "completed") completedSteps += 1;
    }
  });

  return Math.round((completedSteps / totalSteps) * 100);
}

export default function OrderTracking() {
  const { orderId } = useParams();

  const [selectedBatch, setSelectedBatch] = useState("batch1");
  const [modalOpened, setModalOpened] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const batchKey = Object.entries(batches).find(
      ([key, batch]) => batch.orderId === orderId
    )?.[0];

    if (batchKey) {
      setSelectedBatch(batchKey);
    }
  }, [orderId]);

  const trackingData = batches[selectedBatch];
  const completionPercent = calculateCompletion(trackingData.journey);

  // When clicking on a stage card to open modal with details
  function openModalWithData(stage) {
    setModalData(stage);
    setModalOpened(true);
  }

  return (
    <Box p="md" maw={900} mx="auto">
      <Tabs value={selectedBatch} onChange={setSelectedBatch} mb="md">
        <Tabs.List>
          {Object.keys(batches).map((batchKey) => (
            <Tabs.Tab key={batchKey} value={batchKey}>
              Order #{batches[batchKey].orderId}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Text fw={700} size="xl" mb="xs">
        Order Tracking: #{trackingData.orderId}
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        Material: {trackingData.material}
      </Text>

      {/* Overall Progress */}
      <Box mb="lg">
        <Text size="sm" mb={4}>
          Completion: {completionPercent}%
        </Text>
        <Progress value={completionPercent} size="lg" color="blue" />
      </Box>

      <ScrollArea style={{ height: 400 }}>
        <Group spacing={40} align="flex-start" noWrap>
          {trackingData.journey.map((step, i) => {
            if (step.type === "parallel") {
              return (
                <Group key={i} spacing={24} align="flex-start" noWrap>
                  {step.stages.map((s, j) => {
                    const Icon = iconMap[s.icon];
                    const color = statusColors[s.status];
                    const isPending = s.status === "pending";
                    const isStuck = s.status === "in-progress";

                    return (
                      <Stack
                        key={j}
                        align="center"
                        spacing={4}
                        style={{ opacity: isPending ? 0.5 : 1, maxWidth: 160 }}
                      >
                        <Avatar color={color} size={36} radius="xl">
                          <Icon size={18} />
                        </Avatar>
                        <Text size="xs" fw={500} ta="center" truncate>
                          {s.stage}
                        </Text>
                        <Badge variant="light" color="gray" size="xs">
                          Source
                        </Badge>
                        <Text size="xs" c="dimmed" ta="center" truncate>
                          {s.location}
                        </Text>
                        <Text size="xs">🚚 {s.transport}</Text>

                        {s.lastUpdated && (
                          <Text size="xs" c="dimmed" ta="center" mt={-6} mb={4}>
                            Last updated: {s.lastUpdated}
                          </Text>
                        )}

                        <Card
                          withBorder
                          radius="sm"
                          p="xs"
                          shadow="xs"
                          bg={isStuck ? "yellow.0" : "gray.0"}
                          maw={160}
                          style={{ cursor: "pointer", textAlign: "center" }}
                          onClick={() => openModalWithData(s)}
                          sx={{
                            height: 90,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Text size="xs" fw={500} lineClamp={2}>
                            {s.note}
                          </Text>
                        </Card>

                        {isStuck && (
                          <Badge color="yellow" size="xs" mt={4}>
                            In Transit (Delayed)
                          </Badge>
                        )}
                      </Stack>
                    );
                  })}
                </Group>
              );
            } else {
              const Icon = iconMap[step.icon];
              const color = statusColors[step.status];
              const isPending = step.status === "pending";
              const isStuck = step.status === "in-progress";

              return (
                <Group key={i} spacing={0} align="center" noWrap>
                  <Stack
                    align="center"
                    spacing={4}
                    style={{ opacity: isPending ? 0.5 : 1, maxWidth: 160 }}
                  >
                    <Avatar color={color} size={36} radius="xl">
                      <Icon size={18} />
                    </Avatar>
                    <Text size="xs" fw={500} ta="center" truncate>
                      {step.stage}
                    </Text>
                    {i === trackingData.journey.length - 1 && (
                      <Badge variant="light" color="blue" size="xs">
                        Destination
                      </Badge>
                    )}
                    <Text size="xs" c="dimmed" ta="center" truncate>
                      {step.location}
                    </Text>
                    <Text size="xs">🚚 {step.transport}</Text>

                    {step.lastUpdated && (
                      <Text size="xs" c="dimmed" ta="center" mt={-6} mb={4}>
                        Last updated: {step.lastUpdated}
                      </Text>
                    )}

                    <Card
                      withBorder
                      radius="sm"
                      p="xs"
                      shadow="xs"
                      bg={isStuck ? "yellow.0" : "gray.0"}
                      maw={160}
                      style={{ cursor: "pointer", textAlign: "center" }}
                      onClick={() => openModalWithData(step)}
                      sx={{
                        height: 90,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Text size="xs" fw={500} lineClamp={2}>
                        {step.note}
                      </Text>
                    </Card>

                    {isStuck && (
                      <Badge color="yellow" size="xs" mt={4}>
                        In Transit (Delayed)
                      </Badge>
                    )}
                  </Stack>
                  {i !== trackingData.journey.length - 1 && (
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

      {/* Modal for stage details */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={
          <Group spacing="xs" align="center" noWrap>
            <Text fw={700} size="lg" sx={{ flex: 1 }}>
              {modalData?.stage || "Stage Details"}
            </Text>
            {modalData && (
              <Badge
                color={statusColors[modalData.status]}
                size="md"
                variant="filled"
                sx={{ textTransform: "capitalize" }}
              >
                {modalData.status}
              </Badge>
            )}
          </Group>
        }
        size="lg" // medium width modal
        centered
        overlayBlur={3}
        overlayOpacity={0.3}
        padding="xl"
        styles={{
          content: {
            borderRadius: 16,
            minHeight: 320,
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        {modalData && (
          <Stack spacing="md">
            <Group position="apart" noWrap>
              <Text size="md" fw={500} c="dimmed" style={{ maxWidth: "48%" }}>
                <b>Location:</b> {modalData.location}
              </Text>
              <Text size="md" fw={500} c="dimmed" style={{ maxWidth: "48%" }}>
                <b>Transport:</b> {modalData.transport}
              </Text>
            </Group>

            <Box>
              <Text size="sm" mb={4}>
                <b>Note:</b>
              </Text>
              <Text size="sm" sx={{ whiteSpace: "pre-wrap" }}>
                {modalData.note}
              </Text>
            </Box>

            <Group spacing="xs" align="center" noWrap>
              <Text size="sm" fw={500}>
                Verified:
              </Text>
              {modalData.verified ? (
                <Badge
                  color="green"
                  leftSection={<IconCheck size={14} />}
                  radius="sm"
                  variant="light"
                >
                  Verified
                </Badge>
              ) : (
                <Badge
                  color="gray"
                  leftSection={<IconAlertCircle size={14} />}
                  radius="sm"
                  variant="light"
                >
                  Unverified
                </Badge>
              )}
            </Group>

            {modalData.lastUpdated && (
              <Text size="xs" c="dimmed">
                Last Updated: {modalData.lastUpdated}
              </Text>
            )}

            {modalData.blockchainTx && (
              <Button
                component="a"
                href={`https://dummy-blockchain-explorer.com/tx/${modalData.blockchainTx}`}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="outline"
                leftIcon={<IconExternalLink size={18} />}
                sx={{ width: "fit-content", borderRadius: 8, fontWeight: 600 }}
              >
                Verify on Blockchain
              </Button>
            )}

            {modalData.alert && (
              <Badge
                color="yellow"
                variant="filled"
                size="lg"
                fullWidth
                radius="md"
                sx={{ fontWeight: 600 }}
              >
                ⚠️ {modalData.alert}
              </Badge>
            )}

            <Box c="dimmed" size="sm" mt="lg" sx={{ fontStyle: "italic" }}>
              Detailed tracking info and timestamps would appear here.
            </Box>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
