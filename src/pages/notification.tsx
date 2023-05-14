import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import React, { useEffect } from "react";
import {
  Card,
  Progress,
  Text,
  Image,
  Container,
  Grid,
  CardSection,
} from "@mantine/core";
import { useRouter } from "next/router";
// import { useCourses, useCoursesStore } from "src/store/useCourses";
import { useNotifStore } from "src/store/useNotif";

const NotificationPage: CustomNextPage = () => {
  const route = useRouter();
  const { data } = useNotifStore();

  const _data = [
    ...data,
    {
      message: "Welcome to social app",
    },
  ];
  return (
    <Container
      style={{
        maxWidth: "80%",
        marginRight: 0,
      }}
    >
      <Text
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}
      >
        My Notification
      </Text>

      <br />

      {_data?.map((item, i) => (
        <Card
          style={{ marginBottom: 6 }}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          key={i}
        >
          <Text size="sm" color="dimmed">
            {item?.message}
          </Text>
        </Card>
      ))}
    </Container>
  );
};

NotificationPage.getLayout = DashboardLayout;

export default NotificationPage;
