import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { classes } from "src/component/Topbar";
import truncateEthAddress from "truncate-eth-address";

interface UserButtonProps extends UnstyledButtonProps {
  image?: string | null;
  name: string;
  walletAddress: string;
  icon?: React.ReactNode;
  avatarSize?: number | string;
  usernameSize?: number | string;
}

export const UserProfile = ({
  image,
  name,
  walletAddress,
  icon,
  avatarSize,
  usernameSize,
  ...others
}: UserButtonProps) => {
  return (
    <UnstyledButton className={classes.user} {...others} id="userProfile">
      <Group>
        <Avatar src={image} radius={100} size={avatarSize} />

        <div style={{ flex: 1 }}>
          <Text size={usernameSize} weight={700}>
            {name}
          </Text>

          <Text color="dimmed" size={16}>
            {truncateEthAddress(walletAddress)}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};

export default UserProfile;
