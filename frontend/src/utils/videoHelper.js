/**
 * Utility functions for parsing and embedding video URLs (YouTube, MP4, etc.)
 */

export const parseVideoSource = (url) => {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. YouTube Matcher
  // Matches:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  const ytRegex =
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = trimmed.match(ytRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  // 2. Direct Video File (.mp4, .webm, .ogg, .mov)
  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed);
  if (isDirectVideo) {
    return {
      type: "video",
      url: trimmed,
    };
  }

  // 3. Fallback direct video attempt
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return {
      type: "video",
      url: trimmed,
    };
  }

  return null;
};

export const isYouTubeUrl = (url) => {
  const parsed = parseVideoSource(url);
  return parsed?.type === "youtube";
};

export default {
  parseVideoSource,
  isYouTubeUrl,
};
