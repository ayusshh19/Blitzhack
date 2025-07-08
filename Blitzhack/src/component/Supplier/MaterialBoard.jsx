import React, { useState } from "react";
import {
  Card,
  Text,
  Group,
  Badge,
  Table,
  Stack,
  Modal,
  Divider,
  ScrollArea,
  Paper,
  Button,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { requests } from "./Material-data";

function getEsgColor(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "orange";
  return "red";
}

export default function SupplierMaterialListing() {
  const [openedRequest, setOpenedRequest] = useState(null);
  const [approvedQuotations, setApprovedQuotations] = useState({});
  const [search, setSearch] = useState("");

  const handleApprove = (reqId, rawIndex, quoteIndex) => {
    setApprovedQuotations((prev) => ({
      ...prev,
      [reqId]: {
        ...(prev[reqId] || {}),
        [rawIndex]: quoteIndex,
      },
    }));
  };

  const getApprovalStatus = (req) => {
    const approvedMap = approvedQuotations[req.id] || {};
    const totalRaw = req.rawMaterials.length;
    const approvedCount = Object.keys(approvedMap).length;

    if (approvedCount === 0) return { label: "Pending", color: "gray" };
    if (approvedCount < totalRaw)
      return { label: "Partially Approved", color: "orange" };
    return { label: "Approved", color: "green" };
  };

  const getQuotationStats = (rawMaterials) => {
    const allQuotes = rawMaterials.flatMap((rm) => rm.quotations);
    const count = allQuotes.length;
    const prices = allQuotes.map((q) => q.price);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { count, min, max };
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.material.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Stack p="md" spacing="sm">
        <Text fw={700} size="xl">
          Material Requests Summary
        </Text>

        <TextInput
          icon={<IconSearch size={16} />}
          placeholder="Search by customer or material..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {filteredRequests.map((req) => {
          const stats = getQuotationStats(req.rawMaterials);
          const approval = getApprovalStatus(req);

          return (
            <Card
              key={req.id}
              withBorder
              shadow="sm"
              radius="md"
              p="md"
              onClick={() => setOpenedRequest(req)}
              style={{ cursor: "pointer" }}
            >
              <Group grow align="flex-start" spacing="lg">
                <Stack spacing={4}>
                  <Text fw={600}>{req.material}</Text>
                  <Text size="sm" c="dimmed">
                    Qty: {req.quantity} | {req.location}
                  </Text>
                </Stack>

                <Stack spacing={6} align="center">
                  <Text size="sm" c="dimmed" fw={500}>
                    Status
                  </Text>
                  <Badge size="md" color={approval.color}>
                    {approval.label}
                  </Badge>
                </Stack>

                <Stack spacing={6} align="flex-end">
                  <Text size="sm" c="dimmed" fw={500}>
                    Quotations
                  </Text>
                  <Badge color="blue" variant="light">
                    {stats.count} received
                  </Badge>
                  {stats.count > 0 && (
                    <Text size="xs" c="dimmed">
                      ₹{stats.min.toLocaleString()} - ₹
                      {stats.max.toLocaleString()}
                    </Text>
                  )}
                </Stack>
              </Group>
            </Card>
          );
        })}

        {filteredRequests.length === 0 && (
          <Text ta="center" c="dimmed">
            No matching requests.
          </Text>
        )}
      </Stack>

      <Modal
        opened={!!openedRequest}
        onClose={() => setOpenedRequest(null)}
        title={`Quotation Breakdown – ${openedRequest?.material}`}
        size="xl"
        centered
        overlayProps={{ blur: 3 }}
      >
        {openedRequest && (
          <ScrollArea h={500}>
            <Stack>
              <Divider my="sm" label="Raw Material Quotations" />

              {openedRequest.rawMaterials.map((raw, rawIndex) => {
                const approved =
                  approvedQuotations[openedRequest.id]?.[rawIndex];

                return (
                  <Card
                    key={rawIndex}
                    withBorder
                    radius="md"
                    shadow="xs"
                    p="md"
                    mb="xs"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <Group position="apart" mb="sm">
                      <Text fw={600} size="md">
                        {raw.name} ({raw.requiredQty})
                      </Text>
                      {approved !== undefined && (
                        <Badge color="green" variant="filled" size="sm">
                          Approved
                        </Badge>
                      )}
                    </Group>

                    {raw.quotations.length === 0 ? (
                      <Text size="sm" c="red">
                        No quotations received yet.
                      </Text>
                    ) : (
                      <Table
                        withColumnBorders
                        verticalSpacing="sm"
                        horizontalSpacing="md"
                        fontSize="sm"
                        sx={{
                          borderRadius: "8px",
                          border: "1px solid #dee2e6",
                          overflow: "hidden",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ padding: "12px" }}>Supplier</th>
                            <th
                              style={{ padding: "12px", textAlign: "center" }}
                            >
                              ESG
                            </th>
                            <th style={{ padding: "12px", textAlign: "right" }}>
                              Price
                            </th>
                            <th style={{ padding: "12px" }}>Note</th>
                            <th
                              style={{ padding: "12px", textAlign: "center" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {raw.quotations.map((q, quoteIndex) => {
                            const isApproved = approved === quoteIndex;

                            return (
                              <tr key={quoteIndex}>
                                <td style={{ padding: "10px" }}>
                                  {q.supplierName}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <Badge color={getEsgColor(q.esgScore)}>
                                    {q.esgScore}
                                  </Badge>
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "10px",
                                  }}
                                >
                                  {q.currency}{" "}
                                  {q.price.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })}
                                </td>
                                <td style={{ padding: "10px" }}>{q.note}</td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  <Button
                                    size="xs"
                                    color={isApproved ? "gray" : "green"}
                                    variant={isApproved ? "light" : "outline"}
                                    disabled={isApproved}
                                    onClick={() =>
                                      handleApprove(
                                        openedRequest.id,
                                        rawIndex,
                                        quoteIndex
                                      )
                                    }
                                  >
                                    {isApproved ? "Approved" : "Approve"}
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    )}
                  </Card>
                );
              })}
            </Stack>
          </ScrollArea>
        )}
      </Modal>
    </>
  );
}
