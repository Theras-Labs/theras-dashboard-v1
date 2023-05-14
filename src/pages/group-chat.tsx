import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";

const GroupChat: CustomNextPage = () => {
  return <div>GroupChat</div>;
};

GroupChat.getLayout = DashboardLayout;

export default GroupChat;
