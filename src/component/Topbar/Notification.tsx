import React, { FC } from "react";
import Link from "next/link";
import { Indicator, ActionIcon } from "@mantine/core";
import { getPath } from "src/lib/const";
import { Bell } from "tabler-icons-react";

const Notification: FC = () => {
  return (
    <Indicator inline size={14} offset={4} color="red" withBorder>
      <Link href={getPath("NOTIFICATION")} passHref>
        <ActionIcon component="a" variant="hover" radius="xl" size={40}>
          <Bell />
        </ActionIcon>
      </Link>
    </Indicator>
  );
};

export default Notification;
