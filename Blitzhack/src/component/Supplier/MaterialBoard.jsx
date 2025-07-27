import React, { useState, useMemo } from "react";
import {
  Card,
  Text,
  Group,
  Badge,
  Table,
  Stack,
  ScrollArea,
  Paper,
  TextInput,
  Select,
  Slider,
  ActionIcon,
  Tooltip,
  Modal,
  Button,
} from "@mantine/core";
import { IconClipboard, IconQrcode } from "@tabler/icons-react";

import QRCode from "react-qr-code";

import { requests } from "./Material-data";

function getEsgColor(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "orange";
  return "red";
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

export default function SupplierMaterialListing() {
  const [originFilter, setOriginFilter] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("");
  const [minEsgFilter, setMinEsgFilter] = useState(0);
  const [search, setSearch] = useState("");

  const [modalData, setModalData] = useState(null);

  const allOrigins = useMemo(() => {
    const origins = new Set();
    requests.forEach((r) =>
      r.rawMaterials.forEach((m) => origins.add(m.origin))
    );
    return [...origins];
  }, []);

  const allCompliance = useMemo(() => {
    const statuses = new Set();
    requests.forEach((r) =>
      r.rawMaterials.forEach((m) => statuses.add(m.complianceStatus))
    );
    return [...statuses];
  }, []);

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.material.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = r.rawMaterials.some((m) => {
      const originMatch = originFilter ? m.origin === originFilter : true;
      const complianceMatch = complianceFilter
        ? m.complianceStatus === complianceFilter
        : true;
      const minEsgMatch = m.supplierHistory.some(
        (s) => s.esgScore >= minEsgFilter
      );
      return originMatch && complianceMatch && minEsgMatch;
    });

    return matchesSearch && matchesFilter;
  });

  const openModal = (hash, label) => {
    setModalData({ hash, label });
  };

  return (
    <Stack p="md" spacing="md">
      <Text fw={700} size="xl">
        Saint-Gobain Material Sourcing & Traceability
      </Text>

      {/* Filters */}
      <Group spacing="md" grow>
        <TextInput
          placeholder="Search by customer or material..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          icon={<IconClipboard size={16} />}
          sx={{ flex: "2 1 300px" }}
        />
        <Select
          placeholder="Filter by Origin"
          data={[
            { value: "", label: "All Origins" },
            ...allOrigins.map((o) => ({ value: o, label: o })),
          ]}
          value={originFilter}
          onChange={setOriginFilter}
          sx={{ flex: "1 1 200px" }}
        />
        <Select
          placeholder="Filter by Compliance Status"
          data={[
            { value: "", label: "All Compliance Status" },
            ...allCompliance.map((c) => ({ value: c, label: c })),
          ]}
          value={complianceFilter}
          onChange={setComplianceFilter}
          sx={{ flex: "1 1 200px" }}
        />
        <Stack spacing={0} sx={{ flex: "1 1 200px" }}>
          <Text size="sm" weight={500}>
            Minimum ESG Score: {minEsgFilter}
          </Text>
          <Slider
            min={0}
            max={100}
            step={1}
            value={minEsgFilter}
            onChange={setMinEsgFilter}
          />
        </Stack>
      </Group>

      {/* Results */}
      {filteredRequests.length === 0 && (
        <Text ta="center" c="dimmed" mt="xl">
          No matching materials found.
        </Text>
      )}

      <ScrollArea>
        <Stack spacing="lg" mt="md">
          {filteredRequests.map((req) => (
            <Card key={req.id} withBorder shadow="sm" radius="md" p="lg">
              <Group position="apart" mb="md" noWrap>
                <Stack spacing={2}>
                  <Text fw={700} size="xl" lh={1.2}>
                    {req.material}
                  </Text>
                  <Text size="sm" color="dimmed" sx={{ letterSpacing: 0.2 }}>
                    Customer: {req.customer} | Quantity: {req.quantity} |
                    Location: {req.location}
                  </Text>
                </Stack>
                <Badge color="green" variant="filled" size="lg" radius="sm">
                  Blockchain Verified ✅
                </Badge>
              </Group>

              <Table
                verticalSpacing="xl"
                highlightOnHover
                striped
                withBorder
                sx={{
                  th: {
                    backgroundColor: "#f8f9fa",
                    textAlign: "left",
                    padding: "16px 12px",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#212529",
                  },
                  td: {
                    padding: "16px 12px",
                    verticalAlign: "top",
                    fontSize: 13,
                    color: "#333",
                    borderBottom: "1px solid #e9ecef",
                  },
                  tr: {
                    "&:last-of-type td": { borderBottom: "none" },
                  },
                }}
              >
                <thead>
                  <tr>
                    <th style={{ minWidth: 120 }}>Raw Material</th>
                    <th style={{ minWidth: 100 }}>Origin</th>
                    <th style={{ width: 100 }}>Qty Required</th>
                    <th style={{ minWidth: 140 }}>Compliance Status</th>
                    <th style={{ minWidth: 140 }}>Certifications</th>
                    {/* Removed Blockchain Hash column */}
                    <th>Suppliers (ESG & Notes)</th>
                  </tr>
                </thead>
                <tbody>
                  {req.rawMaterials.map((rm, idx) => (
                    <tr key={idx}>
                      <td>
                        <Text fw={600} size="sm">
                          {rm.name}
                        </Text>
                      </td>
                      <td>{rm.origin}</td>
                      <td>{rm.requiredQty}</td>
                      <td>
                        <Badge
                          color={
                            rm.complianceStatus === "Compliant"
                              ? "green"
                              : rm.complianceStatus === "Pending"
                              ? "yellow"
                              : "red"
                          }
                          variant="light"
                          size="sm"
                        >
                          {rm.complianceStatus}
                        </Badge>
                      </td>
                      <td>{rm.certifications.join(", ")}</td>

                      {/* Removed Blockchain Hash cell */}

                      <td>
                        <Stack spacing={8}>
                          {rm.supplierHistory.map((sup, sidx) => (
                            <Paper
                              key={sidx}
                              p="sm"
                              withBorder
                              radius="md"
                              sx={{
                                backgroundColor: "#fefefe",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              }}
                            >
                              <Group position="apart" noWrap spacing="xs">
                                <Text fw={700} size="sm" lineClamp={1}>
                                  {sup.name}
                                </Text>

                                <Badge
                                  color={getEsgColor(sup.esgScore)}
                                  size="sm"
                                  radius="sm"
                                >
                                  ESG: {sup.esgScore}
                                </Badge>
                              </Group>
                              <Text
                                size="xs"
                                color="dimmed"
                                lineClamp={3}
                                mt={4}
                                mb={6}
                              >
                                {sup.note}
                              </Text>

                              <Group mt={6} spacing={6} align="center" noWrap>
                                <Badge
                                  color="teal"
                                  variant="outline"
                                  size="xs"
                                  radius="sm"
                                >
                                  {sup.certificateId}
                                </Badge>

                                <Group spacing={6} noWrap>
                                  <Tooltip
                                    label="Copy certificate hash"
                                    withArrow
                                  >
                                    <ActionIcon
                                      onClick={() =>
                                        copyToClipboard(sup.blockchainHash)
                                      }
                                      size="xs"
                                      color="blue"
                                      variant="light"
                                      radius="sm"
                                    >
                                      <IconClipboard size={14} />
                                    </ActionIcon>
                                  </Tooltip>
                                  <Tooltip label="Show QR code" withArrow>
                                    <ActionIcon
                                      onClick={() =>
                                        openModal(
                                          sup.blockchainHash,
                                          `${sup.name} (Supplier)`
                                        )
                                      }
                                      size="xs"
                                      color="blue"
                                      variant="light"
                                      radius="sm"
                                    >
                                      <IconQrcode size={14} />
                                    </ActionIcon>
                                  </Tooltip>
                                </Group>
                              </Group>
                            </Paper>
                          ))}
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ))}
        </Stack>
      </ScrollArea>

      <Modal
        opened={!!modalData}
        onClose={() => setModalData(null)}
        title={modalData?.label || ""}
        centered
        size="lg"
        overlayOpacity={0.55}
        overlayBlur={3}
        padding="xl"
        styles={{
          header: { fontWeight: 700, fontSize: 20 },
          body: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          },
        }}
      >
        {modalData && (
          <>
            <Paper
              withBorder
              p="sm"
              sx={{
                wordBreak: "break-word",
                width: "100%",
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 14,
                borderRadius: 8,
                backgroundColor: "#f5f5f5",
                userSelect: "all",
              }}
            >
              {modalData.hash}
            </Paper>

            <QRCode value={modalData.hash} size={180} />

            <Button
              fullWidth
              onClick={() => {
                copyToClipboard(modalData.hash);
              }}
              variant="filled"
              color="blue"
            >
              Copy Hash to Clipboard
            </Button>
          </>
        )}
      </Modal>
    </Stack>
  );
}
