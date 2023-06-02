import React from "react";
import { Grid, Skeleton, Container, Text, Card, Button } from "@mantine/core";
import { classes } from "src/component/Courses";
import { BsArrowRight } from "react-icons/bs";
import router from "next/router";
import useContinueCourse from "src/component/Courses/useContinueCourse";

const child = <Skeleton height={140} radius="md" animate={true} />;

const ContinueCourseBanner = () => {
  const { handleContinue } = useContinueCourse();
  return (
    <Grid justify="center" align="stretch">
      <Grid.Col xs={8}>
        <Card
          radius="md"
          p="xl"
          bg="orange"
          style={{
            backgroundColor: "#172A46",
            height: "100%",
          }}
          className={classes.card}
        >
          <Text
            fz="xxxl"
            pb="lg"
            style={{
              color: "#fff",
              fontSize: "28px",
              fontWeight: "500",
              // width: "550px",
            }}
            className={classes.title}
          >
            Activate smart contract on your live session, and
            <br />
            earn more by challenging your viewers
          </Text>
          <Button
            onClick={handleContinue}
            radius="lg"
            // color="orange !important"
            className={classes.button}
            style={{
              color: "#EC3C2B",
              backgroundColor: "#fff",
              textTransform: "uppercase",
            }}
          >
            Learn more
            <BsArrowRight
              style={{
                fontWeight: "900",
                marginLeft: "13px",
                fontSize: "1.5rem",
              }}
            />
          </Button>
        </Card>
      </Grid.Col>
      <Grid.Col xs={4}></Grid.Col>
    </Grid>
  );
};

export default ContinueCourseBanner;
