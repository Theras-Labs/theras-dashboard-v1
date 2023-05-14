import { ActionIcon, Avatar, Text } from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Help, Logout, Settings } from "tabler-icons-react";
import { Menu } from "@mantine/core";
import UserProfile from "src/component/Topbar/UserProfile";
import { classes } from "src/component/Topbar";

const UserMenu: FC = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <Menu trigger="hover">
      <Menu.Target>
        <ActionIcon variant="hover" radius="15px" size={"auto"}>
          {/* <Avatar src={data?.user?.image} radius="xl" />
          <UserProfile /> */}
          <UserProfile
            image={data?.user?.image}
            name={"Siyabonga Ngcobo"}
            walletAddress={"0x151F1814c5211dB47b868481f4cff3ee2E636f51"}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropown}>
        <Menu.Label className={classes.label}>Profile</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<Help size={14} />}>Help</Menu.Item>
        <Menu.Divider />

        <Menu.Item
          onClick={() => signOut()}
          color="red"
          icon={<Logout size={16} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
