import type { CustomNextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthLayout } from "src/layout";
import { getPath } from "src/lib/const";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Container,
} from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import ModalWallet from "src/component/Modal/ModalWallet";
import { LogoTheras } from "src/layout/DashboardLayout/SideNav";

const SignIn: CustomNextPage = () => {
  const router = useRouter();
  // const signIn = () => {
  //   router.push(getPath("INDEX"));
  // };

  const { address, isConnected, connector } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  const { data: session, status } = useSession();

  return (
    <Container
      style={{
        width: "100%",
        maxWidth: "1052px",
        display: "flex",
        flexDirection: "column",
        gap: "4",
        justifyContent: "center",
        // background:''
      }}
    >
      <LogoTheras />
      <br />

      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Space Grotesk, ${theme.fontFamily}`,
          fontWeight: 700,
          color: "white",
        })}
      >
        Log In To Your Dashboard
      </Title>

      {/* <Paper withBorder shadow="md" p={30} mt={30} radius="md"> */}
      {/* <TextInput label="Email" placeholder="test@example.com" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember" />
          <Link href={getPath("FORGOT_PASSWORD")} passHref>
            <Anchor<"a"> size="sm">Forgot Password</Anchor>
          </Link>
        </Group> */}

      <ModalWallet />

      <Button
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
        fullWidth
        mt="xl"
        style={{
          textDecoration: "none",
          textAlign: "center",
          color: "#fff",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "15px 24px",
          backgroundColor: "#64FFDB",
          border: "1px solid #18180A",
          borderRadius: "100px",
          textTransform: "uppercase",
          fontFamily: "Space Grotesk, Sans-Serif",
          fontWeight: "700",
        }}
      >
        <a
          href={`/api/auth/signin`}
          style={{
            textDecoration: "none",
            margin: "auto",
            textAlign: "center",
            color: "#18180A",
          }}
        >
          Web2 OAuth
        </a>
      </Button>
    </Container>
  );
};

SignIn.getLayout = AuthLayout;

export default SignIn;
