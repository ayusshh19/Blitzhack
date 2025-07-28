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
  Table,
  Timeline,
  Alert,
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
  IconCalendar,
  IconClock,
  IconTools,
  IconGauge,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";

const batches = {
  batch1: {
    orderId: "1001",
    material: "Norton Graphene Coating -50ml set",
    finalProductBatch: "SG-2025-07-09-001",
    productionPlan: {
      machineAllocation: [
        {
          machineId: "MX-4500",
          name: "Mixing Chamber A",
          allocatedHours: 4,
          actualHours: 5,
          status: "completed",
          startTime: "2025-07-09 08:00",
          endTime: "2025-07-09 13:00",
          delayReason: "Material viscosity higher than expected",
        },
        {
          machineId: "DR-2200",
          name: "Drying Tunnel B",
          allocatedHours: 2,
          actualHours: 2,
          status: "completed",
          startTime: "2025-07-09 13:30",
          endTime: "2025-07-09 15:30",
          delayReason: null,
        },
        {
          machineId: "PK-7800",
          name: "Packaging Line C",
          allocatedHours: 3,
          actualHours: null,
          status: "pending",
          startTime: "2025-07-10 09:00",
          endTime: null,
          delayReason: null,
        },
      ],
      materialIntegration: [
        {
          material: "Graphene",
          quantity: "500g",
          integrationPoint: "Mixing Stage",
          status: "integrated",
          timestamp: "2025-07-09 08:15",
          batchNumber: "RM-GR-2025-07-05-A1",
        },
        {
          material: "Binder",
          quantity: "1.2kg",
          integrationPoint: "Mixing Stage",
          status: "integrated",
          timestamp: "2025-07-09 08:20",
          batchNumber: "RM-GR-2025-07-05-A1",
        },
        {
          material: "Solvent",
          quantity: "800ml",
          integrationPoint: "Mixing Stage",
          status: "integrated",
          timestamp: "2025-07-09 08:25",
          batchNumber: "RM-GR-2025-07-05-A1",
        },
      ],
      qualityChecks: [
        {
          checkPoint: "Pre-mix",
          status: "passed",
          timestamp: "2025-07-09 08:10",
        },
        {
          checkPoint: "Post-mix",
          status: "passed",
          timestamp: "2025-07-09 12:55",
        },
        {
          checkPoint: "Post-drying",
          status: "pending",
          timestamp: null,
        },
      ],
    },
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
    productionPlan: {
      machineAllocation: [
        {
          machineId: "MX-4500",
          name: "Mixing Chamber A",
          allocatedHours: 6,
          actualHours: null,
          status: "pending",
          startTime: "2025-07-11 08:00",
          endTime: null,
          delayReason: null,
        },
        {
          machineId: "DR-2200",
          name: "Drying Tunnel B",
          allocatedHours: 3,
          actualHours: null,
          status: "pending",
          startTime: null,
          endTime: null,
          delayReason: null,
        },
        {
          machineId: "PK-7800",
          name: "Packaging Line C",
          allocatedHours: 4,
          actualHours: null,
          status: "pending",
          startTime: null,
          endTime: null,
          delayReason: null,
        },
      ],
      materialIntegration: [
        {
          material: "Nano particles from Supplier X",
          quantity: "750g",
          integrationPoint: "Mixing Stage",
          status: "pending",
          timestamp: null,
        },
        {
          material: "Binder from Supplier Y",
          quantity: "1.5kg",
          integrationPoint: "Mixing Stage",
          status: "pending",
          timestamp: null,
        },
      ],
      qualityChecks: [
        {
          checkPoint: "Pre-mix",
          status: "pending",
          timestamp: null,
        },
        {
          checkPoint: "Post-mix",
          status: "pending",
          timestamp: null,
        },
        {
          checkPoint: "Post-drying",
          status: "pending",
          timestamp: null,
        },
      ],
    },
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
  const [activeTab, setActiveTab] = useState("tracking");

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

  const openModalWithData = (stage) => {
    setModalData(stage);
    setModalOpened(true);
  };

  const renderMachineStatus = (machine) => {
    const isDelayed =
      machine.actualHours && machine.actualHours > machine.allocatedHours;
    const isCompleted = machine.status === "completed";

    const tdStyle = {
      padding: "16px 24px",
      border: "1px solid #e9ecef",
      verticalAlign: "middle",
    };

    return (
      <tr key={machine.machineId}>
        <td style={tdStyle}>{machine.machineId}</td>
        <td style={tdStyle}>{machine.name}</td>
        <td style={tdStyle}>
          <Group spacing="xs">
            <Text>{machine.allocatedHours}h</Text>
            {isCompleted && (
              <Text color={isDelayed ? "red" : "green"}>
                ({machine.actualHours}h)
              </Text>
            )}
          </Group>
        </td>
        <td style={tdStyle}>
          <Badge
            color={
              machine.status === "completed"
                ? "green"
                : machine.status === "in-progress"
                ? "yellow"
                : "gray"
            }
          >
            {machine.status}
          </Badge>
        </td>
        <td style={tdStyle}>
          {machine.startTime ? (
            <Text size="sm">
              {new Date(machine.startTime).toLocaleString()}
            </Text>
          ) : (
            "-"
          )}
        </td>
        <td style={tdStyle}>
          {isDelayed && (
            <Tooltip label={machine.delayReason}>
              <Badge color="red" variant="light">
                Delayed
              </Badge>
            </Tooltip>
          )}
        </td>
      </tr>
    );
  };

  const renderMaterialIntegration = (material) => {
    const tdStyle = {
      padding: "16px 24px",
      border: "1px solid #e9ecef",
      verticalAlign: "middle",
    };

    return (
      <tr key={material.material}>
        <td style={tdStyle}>{material.material}</td>
        <td style={tdStyle}>{material.quantity}</td>
        <td style={tdStyle}>{material.integrationPoint}</td>
        <td style={tdStyle}>
          <Badge
            color={
              material.status === "integrated"
                ? "green"
                : material.status === "in-progress"
                ? "yellow"
                : "gray"
            }
          >
            {material.status}
          </Badge>
        </td>
        <td style={tdStyle}>
          {material.timestamp ? (
            <Text size="sm">
              {new Date(material.timestamp).toLocaleString()}
            </Text>
          ) : (
            "-"
          )}
        </td>
      </tr>
    );
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "";
  console.log(userRole);
  const roleStageMap = {
    customer: ["Factory", "Warehouse", "Customer"],
    supplier: ["Raw Supplier A", "Factory", "Warehouse", "Customer"],
    source_manager: ["Raw Supplier A", "Factory", "Warehouse"],
    delivery_manager: ["Factory", "Warehouse", "Customer"],
    production_manager: ["Warehouse"],
  };

  const canViewStage = (stageName) => {
    const allowedStages = roleStageMap[userRole] || [];
    return allowedStages.includes("*") || allowedStages.includes(stageName);
  };

  return (
    <Box p="md" maw={1200} mx="auto">
      <Tabs value={selectedBatch} onChange={setSelectedBatch} mb="md">
        <Tabs.List>
          {Object.keys(batches).map((batchKey) => (
            <Tabs.Tab key={batchKey} value={batchKey}>
              PO #{batches[batchKey].orderId}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Text fw={700} size="xl" mb="xs">
        Batch Tracking: #{trackingData.orderId}
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        Material: {trackingData.material}
      </Text>

      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="tracking">Supply Chain Tracking</Tabs.Tab>
          <Tabs.Tab value="production">Production Planning</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "tracking" ? (
        <>
          <ScrollArea style={{ height: 400 }}>
            <Group spacing={40} align="flex-start" noWrap>
              {trackingData.journey.map((step, i) =>
                step.type === "parallel" ? (
                  <Group key={i} spacing={24} align="center" noWrap>
                    {step.stages
                      .filter((s) => canViewStage(s.stage))
                      .map((s, j) => {
                        const Icon = iconMap[s.icon];
                        const color = statusColors[s.status];
                        const isPending = s.status === "pending";
                        const isStuck = s.status === "in-progress";

                        return (
                          <Stack
                            key={j}
                            align="center"
                            spacing={4}
                            style={{
                              opacity: isPending ? 0.5 : 1,
                              maxWidth: 160,
                            }}
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
                    {i !== trackingData.journey.length - 1 &&
                      ["source_manager", "supplier"].includes(userRole) && (
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
                ) : (
                  canViewStage(step.stage) && (
                    <Group key={i} spacing={0} align="center" noWrap>
                      <Stack
                        align="center"
                        spacing={4}
                        style={{
                          opacity: step.status === "pending" ? 0.5 : 1,
                          maxWidth: 160,
                        }}
                      >
                        <Avatar
                          color={statusColors[step.status]}
                          size={36}
                          radius="xl"
                        >
                          {React.createElement(iconMap[step.icon], {
                            size: 18,
                          })}
                        </Avatar>
                        <Text size="xs" fw={500} ta="center" truncate>
                          {step.stage}
                        </Text>
                        {i === trackingData.journey.length - 1 && (
                          <Badge variant="light" color="blue" size="xs">
                            Destination
                          </Badge>
                        )}

                        <Card
                          withBorder
                          radius="sm"
                          p="xs"
                          shadow="xs"
                          bg={
                            step.status === "in-progress"
                              ? "yellow.0"
                              : "gray.0"
                          }
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

                        {step.status === "in-progress" && (
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
                  )
                )
              )}
            </Group>
          </ScrollArea>
        </>
      ) : ["customer", "supplier", "delivery_manager"].includes(userRole) ? (
        <Alert color="red" title="Access Denied">
          You don't have permission to view production planning.
        </Alert>
      ) : (
        <Stack spacing="xl" mt="xl">
          <Card
            withBorder
            shadow="md"
            radius="md"
            p="xl"
            bg="gray.0"
            sx={{ borderWidth: 2, borderColor: "#e9ecef" }}
          >
            <Group mb="lg" spacing="xs" align="center">
              <IconTools size={24} />
              <Text size="xl" fw={700}>
                Machine Allocation
              </Text>
            </Group>
            <ScrollArea>
              <Table
                striped
                withBorder
                withColumnBorders
                highlightOnHover
                sx={{
                  borderColor: "#dee2e6",
                  borderWidth: 1,
                  borderStyle: "solid",
                  backgroundColor: "#f1f3f5",
                }}
              >
                <thead>
                  <tr>
                    <th>Machine ID</th>
                    <th>Name</th>
                    <th>Allocated Hours</th>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData.productionPlan.machineAllocation.map(
                    renderMachineStatus
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>

          <Card
            withBorder
            shadow="md"
            radius="md"
            p="xl"
            bg="gray.0"
            sx={{ borderWidth: 2, borderColor: "#e9ecef" }}
          >
            <Group mb="lg" spacing="xs" align="center">
              <IconGauge size={24} />
              <Text size="xl" fw={700}>
                Material Integration
              </Text>
            </Group>
            <ScrollArea>
              <Table
                striped
                highlightOnHover
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                  backgroundColor: "#f1f3f5",
                }}
              >
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Integration Point</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData.productionPlan.materialIntegration.map(
                    renderMaterialIntegration
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>

          <Card
            withBorder
            shadow="md"
            radius="md"
            p="xl"
            bg="gray.0"
            sx={{ borderWidth: 2, borderColor: "#e9ecef" }}
          >
            <Group mb="lg" spacing="xs" align="center">
              <IconCheck size={24} />
              <Text size="xl" fw={700}>
                Quality Checks
              </Text>
            </Group>
            <Timeline
              active={trackingData.productionPlan.qualityChecks.findIndex(
                (check) => check.status === "pending"
              )}
              bulletSize={20}
              lineWidth={3}
            >
              {trackingData.productionPlan.qualityChecks.map((check, idx) => (
                <Timeline.Item key={idx} title={check.checkPoint}>
                  <Text size="sm" c="dimmed">
                    {check.status === "passed"
                      ? `Passed at ${new Date(
                          check.timestamp
                        ).toLocaleString()}`
                      : check.status === "pending"
                      ? "Pending"
                      : "Failed"}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Stack>
      )}

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
        size="lg"
        centered
        overlayBlur={3}
        overlayOpacity={0.3}
        padding="xl"
        styles={{
          content: {
            borderRadius: 16,
            minHeight: 320,
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)",
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
                Acknowledge Location
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

            {/* Planner Info */}
            {modalData.planner && (
              <Box mt="md">
                <Text size="sm" fw={600} mb={4}>
                  Production Planner
                </Text>
                <Stack spacing={4}>
                  <Text size="sm">
                    <b>Name:</b> {modalData.planner.name}
                  </Text>
                  <Text size="sm">
                    <b>Email:</b> {modalData.planner.email}
                  </Text>
                  <Text size="sm">
                    <b>Note:</b> {modalData.planner.note}
                  </Text>
                </Stack>
              </Box>
            )}

            {/* Production Order Details */}
            {modalData.productionOrder && (
              <Box mt="md">
                <Text size="sm" fw={600} mb={4}>
                  Production Order Details
                </Text>
                <Stack spacing={6}>
                  <Group spacing="xs" align="center">
                    <Text size="sm" fw={500}>
                      Raw Material Received:
                    </Text>
                    {modalData.productionOrder.rawMaterialReceived ? (
                      <Badge color="green" size="xs">
                        Yes
                      </Badge>
                    ) : (
                      <Badge color="red" size="xs">
                        No
                      </Badge>
                    )}
                  </Group>
                  <Text size="sm">
                    <b>Machine Assigned:</b>{" "}
                    {modalData.productionOrder.machineAssigned}
                  </Text>
                  <Text size="sm">
                    <b>Expected Timeline:</b>{" "}
                    {modalData.productionOrder.expectedTimeline}
                  </Text>
                  <Text size="sm">
                    <b>Current Status:</b>{" "}
                    {modalData.productionOrder.actualStatus}
                  </Text>
                </Stack>
              </Box>
            )}

            <Box c="dimmed" size="sm" mt="lg" sx={{ fontStyle: "italic" }}>
              Detailed tracking info and timestamps would appear here.
            </Box>
          </Stack>
        )}

        {modalData?.stage === "Factory" && modalData.status === "completed" && (
          <Box mt="md">
            <Text size="sm" fw={600} mb="md">
              Batch Information
            </Text>
            <Stack spacing="md">
              <Group spacing="xl">
                <Badge
                  variant="outline"
                  color="blue"
                  leftSection={<IconCheck size={14} />}
                  size="lg"
                >
                  Product: {trackingData.finalProductBatch}
                </Badge>
              </Group>

              {trackingData.productionPlan.materialIntegration.length > 0 && (
                <Box>
                  <Text size="sm" fw={500} mb="sm">
                    Raw Material Batches:
                  </Text>

                  {/* ✅ Table wrapper with padding and border */}
                  <Box
                    sx={(theme) => ({
                      padding: theme.spacing.md,
                      border: `1px solid ${theme.colors.gray[3]}`,
                      borderRadius: theme.radius.sm,
                      overflow: "hidden",
                    })}
                  >
                    <Table
                      striped
                      highlightOnHover
                      withBorder
                      withColumnBorders
                      verticalSpacing="sm"
                      fontSize="sm"
                      sx={{ borderCollapse: "separate", borderSpacing: 0 }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              backgroundColor: "#f8f9fa",
                              fontWeight: 600,
                              padding: "12px 16px",
                              borderBottom: "1px solid #e9ecef",
                              borderTopLeftRadius: "8px",
                            }}
                          >
                            Material
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f8f9fa",
                              fontWeight: 600,
                              padding: "12px 16px",
                              borderBottom: "1px solid #e9ecef",
                            }}
                          >
                            Batch Number
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f8f9fa",
                              fontWeight: 600,
                              padding: "12px 16px",
                              borderBottom: "1px solid #e9ecef",
                              borderTopRightRadius: "8px",
                            }}
                          >
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {trackingData.productionPlan.materialIntegration.map(
                          (mat, index, arr) =>
                            mat.batchNumber && (
                              <tr key={mat.material}>
                                <td
                                  style={{
                                    padding: "12px 16px",
                                    borderBottom:
                                      index === arr.length - 1
                                        ? "none"
                                        : "1px solid #e9ecef",
                                    borderLeft: "1px solid #e9ecef",
                                    ...(index === arr.length - 1 && {
                                      borderBottomLeftRadius: "8px",
                                    }),
                                  }}
                                >
                                  <Group spacing="sm">
                                    <Avatar size={24} radius="xl" color="blue">
                                      {mat.material.charAt(0)}
                                    </Avatar>
                                    <Text>{mat.material}</Text>
                                  </Group>
                                </td>

                                <td
                                  style={{
                                    padding: "12px 16px",
                                    borderBottom:
                                      index === arr.length - 1
                                        ? "none"
                                        : "1px solid #e9ecef",
                                  }}
                                >
                                  <Badge
                                    variant="light"
                                    color="gray"
                                    fullWidth
                                    sx={{ maxWidth: 180 }}
                                  >
                                    {mat.batchNumber}
                                  </Badge>
                                </td>

                                <td
                                  style={{
                                    padding: "12px 16px",
                                    borderBottom:
                                      index === arr.length - 1
                                        ? "none"
                                        : "1px solid #e9ecef",
                                    borderRight: "1px solid #e9ecef",
                                    ...(index === arr.length - 1 && {
                                      borderBottomRightRadius: "8px",
                                    }),
                                  }}
                                >
                                  <Badge
                                    color={
                                      mat.status === "integrated"
                                        ? "green"
                                        : "yellow"
                                    }
                                    variant="light"
                                  >
                                    {mat.status}
                                  </Badge>
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </Table>
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
