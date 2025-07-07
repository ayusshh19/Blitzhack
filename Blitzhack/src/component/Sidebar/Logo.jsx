import { Box, Image } from "@mantine/core";

export default function Logo(props) {
  return (
    <Box mb="md" style={{ textAlign: "center" }}>
      <img
        src={
          "https://www.hipco.com/wp-content/uploads/2020/07/Logo-Saint-Gobain.png"
        }
        alt="Logo"
        style={{ height: 40, width: 100, objectFit: "contain" }}
      />
    </Box>
  );
}
