import React from "react";

interface IVideoBlock {
  src: string;
  width: number;
  height: number;
  title: string;
}

const VideoBlock = ({ src, width, height, title }: IVideoBlock) => {
  return (
    <video src={src} width={width} height={height} controls>
      <track kind="captions" />
      Your browser does not support the video tag.
      <div className="video-controls">
        <button className="play-pause-button">Play/Pause</button>
        <div className="time-controls">
          <span className="current-time">0:00</span>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <span className="duration">0:00</span>
        </div>
        <button className="mute-button">Mute/Unmute</button>
        <div className="volume-controls">
          <div className="volume-bar">
            <div className="volume"></div>
          </div>
        </div>
        <button className="fullscreen-button">Fullscreen</button>
      </div>
    </video>
  );
};

export default VideoBlock;
