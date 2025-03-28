"use client";
import VideoJS from "@/components/Videojs";
import React, { Suspense } from "react";

const page = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        // src: "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
        src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        type: "application/x-mpegURL",
        // src: "/4678261-hd_1080_1920_25fps.mp4",
        // type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className="p-[100px]">
      <div style={{ height: "500px", width: "500px" }}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default page;
