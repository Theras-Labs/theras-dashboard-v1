import type { CustomNextPage } from "next";
import { Avatar, Group, Stack, UnstyledButtonProps } from "@mantine/core";
import { DashboardLayout } from "src/layout";
import { PageContent } from "src/component/PageContent";
import { PageContainer } from "src/component/PageContainer";
import { Container, Image, Text } from "@mantine/core";
import {
  //  UserMenu,
  UserProfile,
} from "src/component/Topbar";
import UpdateDetails from "src/component/Profile/UpdateDetails";
import { useSession } from "next-auth/react";

const Settings: CustomNextPage = () => {
  const { data } = useSession();
  // todo: wallet has diffrent settings
  return (
    <Container style={{ maxWidth: "80%", marginRight: "0" }}>
      <Group>
        <Image
          src="https://images.unsplash.com/photo-1650803321876-63010399313e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          height={324}
          radius={"25px"}
          alt=""
          style={{ position: "relative", zIndex: "0" }}
        />
      </Group>
      <Group
        style={{
          marginTop: "-2rem",
          marginLeft: "2rem",
          position: "relative",
          zIndex: "1",
        }}
      >
        <UserProfile
          name={data?.user?.name}
          image={data?.user?.image}
          walletAddress={""}
          avatarSize={125}
          radius={200}
          usernameSize={32}
        />
      </Group>
      {/* <Group style={{ display: "flex", flexDirection: "column" }}>
        <Text
          style={{
            fontWeight: "700",
            marginTop: "50px",
            marginBottom: "25px",
            width: "100%",
          }}
        >
          Update your profile details
        </Text>
        <Container maw="100%" style={{ margin: "0 auto" }}>
          <UpdateDetails
            style={{
              width: "100%",
              margin: "0",
              padding: "0",
            }}
          />
        </Container>
      </Group> */}
    </Container>
  );
};

Settings.getLayout = DashboardLayout;

export default Settings;
