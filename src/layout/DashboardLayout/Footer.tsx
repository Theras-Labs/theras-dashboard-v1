import { Container, Text } from "@mantine/core";
import React from "react";

const Footer = () => {
  return (
    <Container>
      <Text>
        &copy; SocialFi
        <span>{new Date().getFullYear()}</span>
      </Text>
    </Container>
  );
};

export default Footer;
