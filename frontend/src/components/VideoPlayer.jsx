import React from "react";
import { parseVideoSource } from "../utils/videoHelper.js";
import { Film } from "lucide-react";

const VideoPlayer = ({
  videoUrl,
  posterUrl,
  title = "Video player",
  className = "",
  autoPlay = false,
}) => {
  const videoInfo = parseVideoSource(videoUrl);

  if (!videoInfo) return null;

  if (videoInfo.type === "youtube") {
    return (
      <div className={`relative w-full aspect-video bg-black overflow-hidden rounded-2xl ${className}`}>
        <iframe
          src={`${videoInfo.embedUrl}?rel=0&modestbranding=1${autoPlay ? "&autoplay=1" : ""}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video bg-black overflow-hidden rounded-2xl ${className}`}>
      <video
        controls
        playsInline
        poster={posterUrl}
        preload="metadata"
        className="w-full h-full object-contain bg-black"
      >
        <source src={videoInfo.url} type="video/mp4" />
        <p className="text-white text-xs p-4 flex items-center gap-2">
          <Film className="w-4 h-4 text-zinc-400" />
          เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอจาก URL นี้
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
