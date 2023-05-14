import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Group,
  Container,
  Grid,
  Col,
  useMantineTheme,
  ActionIcon,
  Autocomplete,
  Avatar,
  Indicator,
  Menu,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import BellIcon from "src/icons/BellIcon";
import Image from "next/image";
import { useUserDataStore } from "src/store/useUserDetail";
import { useDisconnect } from "wagmi";
import { getPath } from "src/lib/const";
import { Search, Bell, Settings, Logout, Help, Door } from "tabler-icons-react";
import { notifications } from "@mantine/notifications";
import { useNotifStore } from "src/store/useNotif";
import Cookies from "js-cookie";
import { getLargeCookie } from "src/lib/helpers/store-cookie";
function shortenAddress(address) {
  return address && address?.slice(0, 6) + "..." + address.slice(-5);
}

const SubscriptionType = () => {
  const { userData, loading } = useUserDataStore();

  if (loading) {
    return <></>;
  }

  if (!userData?.subscription) {
    return <span>Basic</span>;
  } else {
    return <span>{userData?.subscription?.tier}</span>;
  }
};

export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  const { data } = useSession();
  const userData = useUserDataStore((state) => state?.userData);
  // const userData = getLargeCookie("cookie_userData");

  return (
    <Container
      style={{
        width: "100%",
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "flex-end",
        color: "white",
      }}
    >
      <Box
        component="header"
        sx={(theme) => ({
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          // backgroundColor: "",
        })}
        style={{
          padding: 10,
          width: "80%",
          marginRight: "0",
        }}
      >
        <Group
          spacing="lg"
          noWrap
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {left}
          <Container style={{ margin: "0", padding: "0" }}>
            {/* Left Side */}
            <Container
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                padding: "0",
              }}
            >
              Welcome Back,{" "}
              {data?.user?.name || shortenAddress(userData?.eth_address)}
            </Container>
            <Container
              style={{
                padding: "0",
              }}
            >
              Membership: <SubscriptionType />
            </Container>
          </Container>
          {/* Right Side */}
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              margin: "0",
              padding: "0",
            }}
          >
            <NotificationBell />
            <UserMenu />
          </Container>
        </Group>
      </Box>
    </Container>
  );
};

const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size="lg"
      placeholder="Search"
      icon={<Search size={18} />}
      styles={{
        root: { flexGrow: 1 },
        input: { border: 0, backgroundColor: "transparent" },
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

const NotificationBell: FC = () => {
  const { data } = useNotifStore();
  const router = useRouter();

  // console.log(data, "DATA NOTIF");
  const _data = [
    ...data,
    {
      message: "Welcome to social app",
    },
  ];
  return (
    <Menu trigger="hover">
      <Menu.Target
        onClick={() => {
          router.push("/notification");
        }}
      >
        <ActionIcon component="a" variant="hover" radius="xl" size={40}>
          <Bell color="white" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          padding: "25px",
          width: "286px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {_data.map((item, i) => (
          <Menu.Item key={i}>{item?.message}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
  // return (
  //   <Indicator inline size={14} offset={4} color="red" withBorder>
  //     <Link href={getPath("NOTIFICATION")} passHref>
  //       <ActionIcon component="a" variant="hover" radius="xl" size={40}>
  //         <Bell />
  //       </ActionIcon>
  //     </Link>
  //   </Indicator>
  // );
};

const UserMenu: FC = () => {
  const router = useRouter();
  const { data } = useSession();
  // const { setLogout, userData } = useUserDataStore((state) => state);
  const { disconnect } = useDisconnect();

  const handleSignOut = async () => {
    if (!!data) {
      signOut();
      notifications.show({
        title: "Info",
        message: "Logging out, see you later!",
      });
      router.push("/sign-in");

      const cookies = Object.keys(Cookies.get());
      cookies.forEach((cookie) => {
        Cookies.remove(cookie);
      });

      // await fetch("/api/auth/logout");
      // setLogout();
      // disconnect();
    }
  };
  return (
    <Menu trigger="hover">
      <Menu.Target>
        <ActionIcon variant="hover" radius="xl" size={40}>
          <Avatar src={data?.user?.image} radius="xl" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          padding: "25px",
          width: "286px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <Menu.Label
          style={{
            textTransform: "uppercase",
            color: "#A7A7A7",
          }}
        >
          Profile
        </Menu.Label>
        <Menu.Item
          icon={<Settings size={14} />}
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<Help size={14} />}
          onClick={() => {
            router.push("/help");
          }}
        >
          Help
        </Menu.Item>
        {/* <Menu.Divider /> */}

        <Menu.Item
          onClick={handleSignOut}
          color="red"
          icon={<Door size={16} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
