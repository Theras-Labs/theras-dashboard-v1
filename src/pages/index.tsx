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
import ModalUpgrade from "src/component/Modal/ModalUpgrade";
import { useNotif } from "src/store/useNotif";
import { useProgress } from "src/store/useProgress";

const Index: CustomNextPage = () => {
  useCourses();
  useNotif();
  useProgress();
  return (
    <Container
      p="md"
      style={{
        overflow: "auto",
        maxWidth: "80%",
        marginRight: "0",
        padding: "0",
      }}
    >
      <ContinueCourseBanner />
    </Container>
  );
};

Index.getLayout = DashboardLayout;

export default Index;
