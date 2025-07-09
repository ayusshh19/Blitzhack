import React, { useState } from "react";
import {
  Select,
  Card,
  Text,
  Stack,
  Table,
  Badge,
  Group,
  Title,
  Box,
  Flex,
} from "@mantine/core";
import { materialOptions, supplierHistoryData } from "./history";

function getEsgColor(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "orange";
  return "red";
}

export default function MaterialSupplierHistory() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const suppliers = selectedMaterial
    ? supplierHistoryData[selectedMaterial]
    : [];

  // Compute min/max unit cost to highlight price difference
  const unitCosts = suppliers.flatMap((s) =>
    s.entries.map((e) => Number(e.total) / Number(e.quantity))
  );
  const minUnitCost = Math.min(...unitCosts);
  const maxUnitCost = Math.max(...unitCosts);

  return (
    <Stack p="md" gap="md">
      <Title order={3}>Material Supplier History</Title>

      <Select
        searchable
        label="Select a Material"
        placeholder="Choose material"
        data={materialOptions}
        value={selectedMaterial}
        onChange={setSelectedMaterial}
        nothingFoundMessage="No material found"
        clearable
      />

      {suppliers.length > 0 &&
        suppliers.map((supplier, index) => {
          const totalQty = supplier.entries.reduce(
            (sum, e) => sum + Number(e.quantity),
            0
          );
          const totalValue = supplier.entries.reduce(
            (sum, e) => sum + Number(e.total),
            0
          );
          const perUnit = totalValue / totalQty;

          const highlightColor =
            perUnit === minUnitCost
              ? "green"
              : perUnit === maxUnitCost
              ? "red"
              : "blue";

          return (
            <Card key={index} withBorder shadow="sm" radius="md" p="md" my="md">
              <Flex justify="space-between" wrap="wrap" align="center">
                <Box>
                  <Text fw={600} size="lg">
                    {supplier.supplier}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {supplier.location}
                  </Text>
                </Box>
                <Stack gap={4} align="flex-end">
                  <Badge color={getEsgColor(supplier.esgScore)} variant="light">
                    ESG Score: {supplier.esgScore}
                  </Badge>
                  <Badge color="gray" variant="outline">
                    Total Qty: {totalQty.toFixed(2)}
                  </Badge>
                  <Badge color="teal" variant="light">
                    Total Value: ₹{totalValue.toLocaleString()}
                  </Badge>
                  <Badge color={highlightColor} variant="filled">
                    Per Unit: ₹{perUnit.toFixed(2)}
                  </Badge>
                </Stack>
              </Flex>

              <Table
                striped
                highlightOnHover
                verticalSpacing="md"
                fontSize="sm"
                mt="md"
                withTableBorder
              >
                <thead style={{ backgroundColor: "#f1f3f5" }}>
                  <tr>
                    <th style={{ padding: "12px" }}>Date</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>
                      Quantity
                    </th>
                    <th style={{ padding: "12px", textAlign: "right" }}>
                      Total (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.entries.map((entry, i) => (
                    <tr key={i}>
                      <td style={{ padding: "12px" }}>{entry.date}</td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        {entry.quantity}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        ₹{Number(entry.total).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: "#f8f9fa", fontWeight: 600 }}>
                    <td style={{ padding: "12px" }}>Total</td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      {totalQty.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      ₹{totalValue.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          );
        })}
    </Stack>
  );
}
