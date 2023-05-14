import { Carousel } from "@mantine/carousel";
import {
  Card,
  Progress,
  Text,
  Image,
  Container,
  Loader,
  Center,
} from "@mantine/core";
import React from "react";
import { useCoursesStore } from "src/store/useCourses";
// import { useUserDataStore } from "src/store/useUserDetail";
import { useRouter } from "next/router";
import { shortenString } from "src/lib/helpers/string";
import { useProgressStore } from "src/store/useProgress";

const CourseCarousel = () => {
  // const { data } = useCourses();
  const { courses, courses_category, loading } = useCoursesStore();

  return (
    <Container
      style={{
        maxWidth: "100%",
        marginTop: "75px",
      }}
    >
      <Text
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}
      >
        My Courses &nbsp;
      </Text>
      {loading && (
        <Center>
          <Loader color="red" />
        </Center>
      )}

      <div style={{ minHeight: 100 }}>
        <Carousel
          withIndicators
          withControls
          // height={900}
          slideSize="25%"
          slidesToScroll={4}
          slideGap="md"
          loop
          align="start"
          dragFree
        >
          {!!courses_category &&
            !!courses_category.length &&
            courses_category.map((item: any, i: number) => (
              <Carousel.Slide
                style={{ paddingBottom: 28, cursor: "pointer" }}
                key={item?.id}
              >
                <CourseCard
                  {...{
                    item,
                    courses,
                    courses_category,
                  }}
                />
              </Carousel.Slide>
            ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default CourseCarousel;

const calculateProgressLeft = (dataProgress, category_id, item) => {
  // generate next course instead
  // const course_id = dataProgress?.[category_id]?.current_id;
  // const order_index = dataProgress?.[category_id]?.current_index;

  return !!dataProgress?.[category_id]
    ? {
        course_id: dataProgress?.[category_id]?.current_id,
        timeplay: dataProgress?.[category_id]?.timeplay,
        order_index: dataProgress?.[category_id]?.current_index,
      }
    : {
        course_id: null,
        timeplay: null,
        order_index: null,
      };
};
//before and modal

export const CourseCard = ({ item, courses_category, courses }) => {
  const route = useRouter();
  const { dataProgress } = useProgressStore();

  const maxCourses = courses?.filter(
    (o) => o?.category_id === item?.id
  )?.length;

  const completedCourses = !dataProgress
    ? 0
    : dataProgress?.[item?.id]?.progress?.length
    ? dataProgress?.[item?.id]?.progress?.length
    : 0;
  const percentage = (completedCourses / maxCourses) * 100;

  const { course_id, timeplay, order_index } = calculateProgressLeft(
    dataProgress,
    item?.id,
    item
  );

  return (
    <Card
      onClick={() => {
        route.push(
          // use next course_id if it exist
          `/detail-course?id=${item?.id}&course_id=${course_id}&timeplay=${timeplay}&order_index=${order_index}`
        );
      }}
      shadow="sm"
      padding="xl"
      component="div"
      style={{
        border: "1px solid #EC3C2B",
        borderRadius: "15px",
        height: "381px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container
        style={{
          maxWidth: "100%",
          padding: "0",
          margin: "0",
        }}
      >
        <Image
          radius="md"
          src={item?.headline_image}
          height={100}
          alt="No way!"
        />

        <Text weight={500} size="lg" mt="md">
          {item.title}
        </Text>
        <Text color="dimmed">{shortenString(item?.description)}</Text>
      </Container>
      <div>
        <Text weight={500} size="lg" mt="md">
          {completedCourses} / {maxCourses}
        </Text>
        <Progress value={percentage ?? 0} color="dark" />
      </div>
    </Card>
  );
};
