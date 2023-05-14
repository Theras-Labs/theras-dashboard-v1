import { Card, Title, Button } from "@mantine/core";
import React from "react";
import { ArrowRight } from "tabler-icons-react";

const BannerFluencr = () => {
  return (
    <Card
      shadow="sm"
      component="a"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: "#64FFDB",
      }}
      target="_blank"
    >
      <Title
        order={4}
        style={{
          fontSize: "24px",
        }}
      >
        Start Earning. <br />
        Play to Earn.
        <br />
      </Title>
      <Button
        style={{ background: "#0A192F" }}
        size="lg"
        radius="xl"
        onClick={() => window.open("https://theras.xyz/arcades")}
      >
        Play Arcades
        <ArrowRight style={{ marginLeft: "1rem" }} />
      </Button>
    </Card>
  );
};

export default BannerFluencr;
