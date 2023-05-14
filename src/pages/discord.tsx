import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";

const Discord: CustomNextPage = () => {
  return <div>Discord</div>;
};

Discord.getLayout = DashboardLayout;

export default Discord;
