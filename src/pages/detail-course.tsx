import type { CustomNextPage, GetServerSideProps } from "next";
import { DashboardLayout } from "src/layout";
import { Box, Container, Text } from "@mantine/core";
// import VideoBlock from "src/component/Video/VideoBlock";
import NextVideoItem from "src/component/Courses/NextVideoItem";
import { useCoursesStore } from "src/store/useCourses";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { getServerLargeCookie } from "src/lib/helpers/store-cookie";
import { useProgressStore } from "src/store/useProgress";
import useUserDetail, { useUserDataStore } from "src/store/useUserDetail";
interface DetailCourseProps {
  courses: any[];
  id: string;
}

function removePlaylistParameter(videoUrl) {
  const parts = videoUrl.split("&list=");
  return parts.shift();
}

function VideoPlayer(props) {
  const { updateProgress } = useProgressStore();
  const { userID } = useUserDataStore();

  const [isUpdating, setIsUpdating] = useState(false);

  // const courseInfo = props.allVideos.find(j => j.video_url === props.videoUrl)
  const courseInfo = useMemo(
    () => props.allVideos.find((j) => j.video_url === props.videoUrl),
    [props.allVideos, props.videoUrl]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUpdating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isUpdating, props.videoUrl]);

  return (
    <ReactPlayer
      ref={props?.ref}
      playing={!props?.pause}
      // onEnded={}
      onProgress={(p) => {
        // console.log(props);
        // {playedSeconds: 2.3579100896453857, played: 0.0012989086050442245, loadedSeconds: 20.001, loaded: 0.011018007481954785}
        if (!isUpdating && p.played > 0.8) {
          setIsUpdating(true);
          updateProgress(
            userID,
            props?.category_id,
            courseInfo?.id,
            courseInfo?.id,
            props?.totalVideos
          );
        }
      }}
      style={{
        objectFit: "cover",
        background: "transparent",
        margin: "0 auto",
        borderRadius: 20,
      }}
      config={{
        // youtube: { playerVars: { disablekb: 1 } },
        file: {
          attributes: {
            controlsList: "nodownload",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "transparent",
            },
          },
        },
      }}
      onPause={() => {
        props.setPause(true);
      }}
      {...props}
      url={removePlaylistParameter(props.videoUrl)}
      key={props.videoUrl}
    />
  );
}

// send latest data
const DetailCourse: CustomNextPage = (props) => {
  // const { courses, loading } = useCoursesStore();
  const router = useRouter();
  const { id, course_id, timeplay, order_index } = router.query;
  const refVideo = useRef();

  // const [data, setData] = useState(props?.data);
  const [pause, setPause] = useState(false);

  const [currentVideo, setCurrentVideo] = useState(props?.currentPlay);
  // fix route params for this
  const [onPlaying, setPlaying] = useState({
    course_id: props?.course_id,
    order_index: props?.order_index,
    timeplay: timeplay ?? 0,
  });

  // // move it into serverside?
  // useEffect(() => {
  //   const loadCourses = () => {
  //     // filter out courses
  //     const c = courses.filter((item, i) => {
  //       return item?.category_id === id;
  //     });
  //     setData(c.sort((a, b) => a.order - b.order));
  //     setCurrentVideo(c[0]?.video_url);
  //   };

  //   if (!!id && !!courses.length) {
  //     loadCourses();
  //   }
  // }, [id, loading, courses]);

  // PARAMS read on time and id playing
  useEffect(() => {
    // what's the id, order, time?
    if (!!timeplay && refVideo?.current) {
      refVideo?.current?.seekTo(timeplay);
    }
  }, [timeplay, refVideo, id]);

  return (
    <Container style={{ maxWidth: "80%", marginRight: "0" }}>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "15px",
        }}
      >
        Pick up where you left off
      </Text>
      <Box>
        {currentVideo && (
          <VideoPlayer
            {...{
              category_id: id,
              onPlaying,
              setPlaying,
              ref: refVideo,
              videoUrl: currentVideo,
              pause,
              setPause,
              totalVideos: props?.data?.length,
              allVideos: props?.data,
              // nextIndex
            }}
            // playsInline
            loop={false}
            controls
            id="video"
          />
        )}

        <Container
          style={{
            maxWidth: "100%",
            margin: "0",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginTop: "15px",
            }}
          >
            What&apos;s Next
          </Text>
          {!!props?.data &&
            props?.data.map((item, i) => (
              <NextVideoItem
                {...item}
                setCurrentVideo={() => {
                  setPlaying({
                    id: item?.id,
                    course_id: item?.id,
                    order_index: item?.order,
                    category_id: item?.category_id,
                    time: 0.001,
                  });
                  setCurrentVideo(item?.video_url);
                }}
                {...{
                  setPause,
                  pause,
                  selected: currentVideo === item?.video_url,
                }}
                key={i}
              />
            ))}
        </Container>
      </Box>
    </Container>
  );
};

DetailCourse.getLayout = DashboardLayout;

export default DetailCourse;

export const getServerSideProps: GetServerSideProps<DetailCourseProps> = async (
  context
) => {
  const cookieData = getServerLargeCookie(
    "COURSES",
    context.req.headers.cookie
  );
  const courses = cookieData ? cookieData?.courses : [];

  const { id, course_id, timeplay, order_index } = context.query;

  const c = courses.filter((item: any) => {
    return item?.category_id === id;
  });
  const result = c.sort((a: any, b: any) => a.order - b.order);

  const courseId =
    course_id !== "null" || !course_id ? course_id : result[0]?.id;

  const orderIndex =
    order_index !== "null" || !order_index ? order_index : result[0]?.order;

  // using complex comparison, in case admin chnage the order of videos or delete
  const currentPlaying =
    course_id !== "null" || !course_id
      ? // find out if this is last video ?
        result?.find((k) => k?.id === course_id)?.video_url ===
        result?.[result.length - 1].video_url
        ? // if last video
          result?.[result.length - 1].video_url
        : // todo: check if deleted video (will change order index?)
          // if not last video
          result?.[Number(order_index)]?.video_url
      : null;

  // console.log(
  //   result?.find((k) => k?.id === course_id)?.video_url ===
  //     result?.[result.length - 1].video_url,
  //   "x,",
  //   currentPlaying,
  //   "currentPlaying",
  //   result.length - 1,
  //   result?.[result.length - 1].video_url,
  //   result?.[Number(order_index)]?.video_url
  // );
  return {
    props: {
      data: result,
      id: id as string,
      currentPlay: currentPlaying
        ? currentPlaying
        : !!result[0]
        ? result[0]?.video_url
        : null,
      course_id: courseId,
      order_index: orderIndex,
      // currentPlay: result[Number(order_index) ?? 0]?.video_url,
    },
  };
};
