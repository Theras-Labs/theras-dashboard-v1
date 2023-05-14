import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { Container, Text } from "@mantine/core";

const SuccessStripe: CustomNextPage = () => {
  return (
    <Container style={{ maxWidth: "80%", marginRight: "0" }}>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "15px",
        }}
      >
        Success
      </Text>
    </Container>
  );
};

SuccessStripe.getLayout = DashboardLayout;

export default SuccessStripe;
