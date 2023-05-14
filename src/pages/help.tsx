import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";

const Help: CustomNextPage = () => {
  return <div>Help</div>;
};

Help.getLayout = DashboardLayout;

export default Help;
