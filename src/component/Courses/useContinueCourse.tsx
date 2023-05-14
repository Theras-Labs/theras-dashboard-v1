import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import React from "react";
import { useProgressStore } from "src/store/useProgress";

export default function useContinueCourse() {
  const { dataProgress } = useProgressStore();
  const route = useRouter();

  // todo: flaw if user update the membership, still attached with last playlist
  // need to update detail course page to check membership video restriction
  const handleContinue = async () => {
    // show notification : no latest
    if (!dataProgress)
      return notifications.show({
        title: "Info",
        message: "Feature is locked!",
      });

    // compare the latest updateAt
    const latestUpdatedAt = Math.max(
      ...Object.values(dataProgress).map((item) => item?.updatedAt)
    );
    const latestUpdatedAtProperty = Object.keys(dataProgress).find(
      (key) => dataProgress[key].updatedAt === latestUpdatedAt
    ) as string;

    const item = dataProgress[latestUpdatedAtProperty];

    route.push(
      // use next course_id if it exist
      `/detail-course?id=${latestUpdatedAtProperty}&course_id=${item?.current_id}&timeplay=${item?.timeplay}&order_index=${item?.current_index}`
    );
  };

  return {
    handleContinue,
  };
}
