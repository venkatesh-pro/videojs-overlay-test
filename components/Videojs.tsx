"use client";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-overlay";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  const overlay_content = `
  <div id="overlaycss" style="position:absolute; top:0">
    <img alt="Qries" style="width:50px;height:50px" src="/animation.gif"
  </div>`;
  const overlay_content2 = `
  <div id="overlaycss" style="position:absolute; top:60px;left:10px">
    <p>Send by</p>
    <p style="color:red">Venkatesh</p>
  </div>`;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      player.on("userinactive", () => {
        player.trigger("hideControls"); // Ends the overlay
      });
      player.on("useractive", () => {
        if (player.paused() === false) {
          // Only if video is playing
          player.trigger("play"); // Restart the overlay
        }
      });
      player.overlay({
        overlays: [
          {
            content: overlay_content,
            start: "play",
            end: "hideControls",
          },
          {
            content: overlay_content2,
            start: "play",
            end: "hideControls",
          },
        ],
      });
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="relative">
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
