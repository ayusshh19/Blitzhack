import {
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Stack,
  Group,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Sidebar/Logo";
import backgroundimg from "../assets/backgroundimg.png";

const roles = [
  { value: "supplier", label: "Supplier" },
  { value: "source_manager", label: "Source Manager" },
  { value: "delivery_manager", label: "Delivery Manager" },
  { value: "customer", label: "Customer" },
  { value: "production_manager", label: "Production Manager" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, [navigate]);

  const handleLogin = () => {
    if (!email || !password || !role) {
      setError("Please fill all fields.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, role }));
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <img
        src={backgroundimg}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          opacity: 0.8,
        }}
      />

      {/* Content Container */}
      <Container
        size={420}
        px={0}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          withBorder
          sx={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Center the logo horizontally */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Logo />
          </Box>

          <Stack mt="md" spacing="sm" style={{ width: "100%" }}>
            {error && (
              <Text color="red" size="xs" align="center">
                {error}
              </Text>
            )}

            <TextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Select
              label="Select Role"
              placeholder="Choose your role"
              data={roles}
              value={role}
              onChange={setRole}
              required
            />

            <Button fullWidth onClick={handleLogin} mt="sm">
              Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
