import { Container } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { AiFillPlayCircle, AiOutlinePause } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

interface INextVideoItem {
  videoTitle: string;
}

const NextVideoItem = ({
  title,
  setCurrentVideo,
  selected = false,
  setPause,
  ...props
}: any) => {
  return (
    <Container
      onClick={setCurrentVideo}
      style={{
        cursor: "pointer",
        maxWidth: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "0",
        padding: "28px 12px",
        background: "#fff",
        boxShadow: "7px 7px 40px rgba(0, 0, 0, 0.04)",
        borderRadius: "9px",
        border: selected && `1px solid red`,
      }}
    >
      <span style={{ alignSelf: "center" }}>{title}</span>
      <span style={{ display: "flex" }}>
        {!selected && (
          <AiFillPlayCircle
            style={{ alignSelf: "center" }}
            size={40}
            color="#EC3C2B"
          />
        )}
        {selected && !props?.pause && (
          <AiOutlinePause
            onClick={() => setPause(true)}
            // running when played
            // will trigger pause
            style={{ alignSelf: "center" }}
            size={40}
            color="#EC3C2B"
          />
        )}

        {selected && props?.pause && (
          <FaPlay
            onClick={() => setPause(false)}
            // running when played
            // will trigger pause
            style={{ alignSelf: "center" }}
            size={40}
            color="#EC3C2B"
          />
        )}
      </span>
    </Container>
  );
};

export default NextVideoItem;
