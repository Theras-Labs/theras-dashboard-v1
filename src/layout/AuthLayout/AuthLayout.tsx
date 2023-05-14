import { Center, Container } from "@mantine/core";
import type { CustomLayout } from "next";

import { LayoutErrorBoundary } from "../LayoutErrorBoundary";

export const AuthLayout: CustomLayout = (page) => {
  return (
    <Center
      sx={(theme) => ({
        minHeight: "100vh",
        background: "#0A192F",
      })}
    >
      <Container size="xs" sx={{ width: 480, paddingBottom: 16 }}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </Container>
    </Center>
  );
};
