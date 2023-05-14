import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import React, { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Progress, Text, Image, Container, Grid } from "@mantine/core";
import { useUserDataStore } from "src/store/useUserDetail";
import { useRouter } from "next/router";
import { useCourses, useCoursesStore } from "src/store/useCourses";
import Upgrade from "src/component/Banner/UpgradeButton";
import { shortenString } from "src/lib/helpers/string";
import { CourseCard } from "src/component/Courses/CourseCarousel";

const MyCourses: CustomNextPage = () => {
  const { courses, courses_category, loading } = useCoursesStore();
  return (
    <Container
      style={{
        maxWidth: "80%",
        marginRight: "0",
      }}
    >
      <Text
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}
      >
        My Courses
      </Text>
      <Grid>
        {!!courses_category &&
          !!courses_category.length &&
          courses_category.map((item: any, i: number) => (
            <Grid.Col md={6} lg={3} style={{ paddingBottom: 28 }} key={i}>
              <CourseCard
                {...{
                  item,
                  courses,
                  courses_category,
                }}
              />
            </Grid.Col>
          ))}
      </Grid>
      <Upgrade />
    </Container>
  );
};

MyCourses.getLayout = DashboardLayout;

export default MyCourses;
