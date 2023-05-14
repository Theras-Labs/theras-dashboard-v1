import React from "react";
import { Card, Image, Text, Container, Progress, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
export default function Upgrade() {
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="div"
      style={{
        background: "#000",
        borderRadius: "25px",
        color: "#fff",
        padding: "25px 50px",
        marginTop: "50px",
      }}
    >
      {/* Better Access Container */}
      <Container style={{ maxWidth: "100%", padding: "0" }}>
        <Text
          style={{
            textTransform: "uppercase",
          }}
        >
          Better Access
        </Text>
      </Container>
      {/* CTA Container */}
      <Container
        style={{
          maxWidth: "100%",
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "row",
          gap: "100px",
        }}
      >
        <Text
          weight={500}
          size="28px"
          mt="md"
          style={{ alignSelf: "center", flexBasis: "60%" }}
        >
          Upgrade today to get more access to material and people within the
          network.
        </Text>

        <Button
          radius="lg"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            textTransform: "uppercase",
            alignSelf: "center",
          }}
          onClick={() => {
            router.push("/upgrades");
          }}
        >
          Upgrade Current Package{" "}
          <BsArrowRight
            style={{
              fontWeight: "900",
              marginLeft: "13px",
              fontSize: "1.5rem",
            }}
          />
        </Button>
      </Container>
    </Card>
  );
}
