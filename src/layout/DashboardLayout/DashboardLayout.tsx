import { FC, useEffect } from "react";
import type { CustomLayout } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Box,
  CloseButton,
  Container,
  Drawer,
  MediaQuery,
} from "@mantine/core";
import { Menu2 } from "tabler-icons-react";
import { LayoutErrorBoundary } from "../LayoutErrorBoundary";
import Footer from "src/layout/DashboardLayout/Footer";

const Header = dynamic(async () => {
  const { Header } = await import("./Header");
  return Header;
});

const SideNav = dynamic(async () => {
  const { SideNav } = await import("./SideNav");
  return SideNav;
});

export const DashboardLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        body: { minHeight: "100vh" },
        main: { padding: 0, backgroundColor: "#0A192F" },
      })}
      navbar={
        <>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <SideNav />
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <DrawerNav opened={opened} handleClose={handlers.close} />
          </MediaQuery>
        </>
      }
    >
      <Header
        left={
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <ActionIcon
              variant="hover"
              radius="xl"
              size={40}
              onClick={handlers.open}
            >
              <Menu2 />
            </ActionIcon>
          </MediaQuery>
        }
      />
      <Box py="xl" px="md">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </Box>
      {/* <Footer /> */}
    </AppShell>
  );
};

const DrawerNav: FC<{ opened: boolean; handleClose: () => void }> = ({
  opened,
  handleClose,
}) => {
  const router = useRouter();

  // SideNav  Drawer
  useEffect(() => {
    router.events.on("routeChangeStart", handleClose);
    return () => {
      router.events.off("routeChangeStart", handleClose);
    };
  }, [handleClose, router.events]);

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      size="auto"
      withCloseButton={false}
      sx={{ position: "relative" }}
    >
      <CloseButton
        size="xl"
        radius="xl"
        variant="transparent"
        onClick={handleClose}
        sx={{
          position: "absolute",
          zIndex: 999,
          top: 8,
          right: -56,
          color: "white",
          "&:not(:disabled):active": { transform: "none" },
        }}
      />
      <SideNav />
    </Drawer>
  );
};
