import React, { useState } from "react";
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  TextInput,
  ScrollArea,
  Box,
  Select,
  Flex,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const statusColors = {
  Fulfilled: "green",
  "Waiting for Quotation": "yellow",
  "New Request": "blue",
};

const initialRequests = [
  {
    id: 1,
    customer: "ABC Industries",
    material: "Norton Graphene Coating - 50ml",
    quantity: 500,
    status: "New Request",
    location: "Pune",
  },
  {
    id: 2,
    customer: "XYZ Manufacturing",
    material: "Tekbond Silicone GP - 260ML",
    quantity: 1000,
    status: "Waiting for Quotation",
    location: "Chennai",
  },
  {
    id: 3,
    customer: "LMN Chemicals",
    material: "Resin Binder XZ-10",
    quantity: 200,
    status: "Fulfilled",
    location: "Vadodara",
  },
  {
    id: 4,
    customer: "Tata Motors",
    material: "High-Temp Brake Lining",
    quantity: 1500,
    status: "New Request",
    location: "Pimpri-Chinchwad",
  },
  {
    id: 5,
    customer: "Bajaj Auto Ltd",
    material: "Kevlar Fiber Sheet - 5mm",
    quantity: 800,
    status: "Waiting for Quotation",
    location: "Aurangabad",
  },
  {
    id: 6,
    customer: "Larsen & Toubro",
    material: "Insulation Compound - ISOLX 990",
    quantity: 250,
    status: "Fulfilled",
    location: "Mumbai",
  },
  {
    id: 7,
    customer: "Ashok Leyland",
    material: "Coolant Additive - ThermoGEL X",
    quantity: 1200,
    status: "New Request",
    location: "Hosur",
  },
  {
    id: 8,
    customer: "ITC Limited",
    material: "Paper Coating Chemical - PC-200",
    quantity: 600,
    status: "New Request",
    location: "Kolkata",
  },
  {
    id: 9,
    customer: "Saint-Gobain",
    material: "Glass Fiber Roll - 2m x 50m",
    quantity: 320,
    status: "Waiting for Quotation",
    location: "Sriperumbudur",
  },
  {
    id: 10,
    customer: "Amara Raja Batteries",
    material: "Battery Grade Sulfuric Acid",
    quantity: 10000,
    status: "Fulfilled",
    location: "Tirupati",
  },
];

export default function MaterialRequirement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [requests, setRequests] = useState(initialRequests);

  const handleUpdateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch = r.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollArea p="lg" h="100vh">
      <Text size="xl" fw={700} mb="md">
        Customer Material Requests
      </Text>

      <Flex justify="space-between" wrap="wrap" gap="md" mb="md">
        <TextInput
          icon={<IconSearch size={16} />}
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ flexGrow: 1, minWidth: 250 }}
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={setStatusFilter}
          data={["All", "New Request", "Waiting for Quotation", "Fulfilled"]}
          style={{ minWidth: 220 }}
        />
      </Flex>

      <Stack spacing="md">
        {filteredRequests.map((req) => (
          <Card key={req.id} withBorder shadow="sm" radius="md" p="md">
            <Group position="apart" align="center" wrap="wrap">
              <Box>
                <Text fw={600} size="md">
                  {req.customer}
                </Text>
                <Text size="sm" c="dimmed">
                  {req.material} | Qty: {req.quantity}
                </Text>
                <Text size="xs" c="dimmed">
                  Location: {req.location}
                </Text>
              </Box>

              <Group spacing="sm" ml="auto">
                <Badge
                  color={statusColors[req.status] || "gray"}
                  variant="light"
                  size="sm"
                >
                  {req.status}
                </Badge>

                {req.status === "New Request" && (
                  <Button
                    size="sm"
                    variant="outline"
                    color="blue"
                    onClick={() =>
                      handleUpdateStatus(req.id, "Waiting for Quotation")
                    }
                  >
                    Get Quotation
                  </Button>
                )}

                {req.status === "Waiting for Quotation" && (
                  <Button
                    size="sm"
                    variant="outline"
                    color="red"
                    onClick={() => handleUpdateStatus(req.id, "New Request")}
                  >
                    Revoke
                  </Button>
                )}
              </Group>
            </Group>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <Text ta="center" c="dimmed" mt="xl">
            No requests found matching your filters.
          </Text>
        )}
      </Stack>
    </ScrollArea>
  );
}
