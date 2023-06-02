import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { useSession } from "next-auth/react";
import { Card, Image, Text, Container, Progress } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useCourses } from "src/store/useCourses";
import BannerUpgrade from "src/component/Banner/UpgradeButton";
import useUserDetail, { useUserDataStore } from "src/store/useUserDetail";
// import { db } from "../../firebase.config";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import ContinueCourseBanner from "src/component/Courses/ContinueCourseBanner";
import { useRouter } from "next/router";
// import ModalUpgrade from "src/component/Modal/ModalUpgrade";
import { useNotif } from "src/store/useNotif";
import { useProgress } from "src/store/useProgress";
import SummaryFinance from "src/component/Dashboard/Summary";
import ChartsEarning, {
  ChartDaily,
} from "src/component/Dashboard/ChartsEarning";
import ChartsLeaderboard from "src/component/Dashboard/ChartsLeadeboard";
import ChartsLeadeboardWeekly from "src/component/Dashboard/ChartsLeaderboardWeekly";
import ChartsActivity from "src/component/Dashboard/ChartsActivity";
import ChartPieNFT from "src/component/Dashboard/ChartsPieNFT";

//
const Index: CustomNextPage = () => {
  useCourses();
  useNotif();
  useProgress();
  return (
    <div className="">
      <ContinueCourseBanner />
      <br />
      <SummaryFinance />
      <div className="w-full grid grid-cols-2 gap-20">
        <ChartDaily />
        <ChartsEarning />
      </div>
      <br />
      <br />
      <div className="w-full grid grid-cols-2 gap-20">
        <ChartsLeaderboard />
        <ChartsLeadeboardWeekly />
      </div>
      <br />
      <br />
      <div className="w-full grid grid-cols-2 gap-20">
        <ChartsActivity />
        <ChartPieNFT />
      </div>
      <br />
      <br /> <br />
      <br />
    </div>
  );
};

Index.getLayout = DashboardLayout;

export default Index;
