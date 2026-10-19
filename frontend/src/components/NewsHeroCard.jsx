import React, { useState } from "react";
import { Eye, Edit3, Trash2, Calendar, User, Sparkles, ArrowUpRight, Play } from "lucide-react";
import { parseVideoSource } from "../utils/videoHelper.js";

const NewsHeroCard = ({ news, onView, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  if (!news) return null;

  // Fallback image url if not provided or broken
  const defaultPlaceholder =
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80";
  const displayImage = !imageError && news.imageUrl ? news.imageUrl : defaultPlaceholder;

  // Parse video source (YouTube / MP4 / etc.)
  const videoInfo = parseVideoSource(news.videoUrl);

  return (
    <div className="w-full bg-[#18181B] rounded-3xl shadow-xl overflow-hidden border border-zinc-800 flex flex-col lg:flex-row group transition-all duration-300 hover:shadow-2xl hover:border-zinc-700">
      {/* 2. Hero Media Section: Video Player or Image */}
      <div className="lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] bg-black flex items-center justify-center overflow-hidden">
        {videoInfo ? (
          // Video Display (YouTube iframe or HTML5 <video controls>)
          <div className="w-full h-full min-h-[260px] sm:min-h-[340px] aspect-video relative bg-black flex items-center justify-center">
            {videoInfo.type === "youtube" ? (
              <iframe
                src={`${videoInfo.embedUrl}?rel=0&modestbranding=1`}
                title={news.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full min-h-[260px] sm:min-h-[340px] border-0"
              />
            ) : (
              <video
                controls
                playsInline
                poster={displayImage}
                preload="metadata"
                className="w-full h-full min-h-[260px] sm:min-h-[340px] object-contain bg-black"
              >
                <source src={videoInfo.url} type="video/mp4" />
                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอนี้
              </video>
            )}

            {/* Subdued overlay badges on top-left of video */}
            <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
              <span className="px-3 py-0.5 rounded-full bg-[#F4F4F5]/90 text-[#18181B] text-[11px] font-bold shadow-md backdrop-blur-sm">
                {news.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-sm">
                <Play className="w-2.5 h-2.5 fill-white" /> วิดีโอข่าว
              </span>
            </div>
          </div>
        ) : (
          // Standard News Image Display
          <>
            <img
              src={displayImage}
              alt={news.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#18181B]/95 pointer-events-none"></div>

            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#F4F4F5] text-[#18181B] text-xs font-bold tracking-wide shadow-md">
                {news.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 text-zinc-200 text-xs font-medium backdrop-blur-md border border-white/10">
                <Sparkles className="w-3 h-3 text-amber-400" /> ข่าวเด่นไฮไลต์
              </span>
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                  news.status
                    ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/30"
                    : "bg-zinc-900/80 text-zinc-300 border-zinc-700"
                }`}
              >
                {news.status ? "● เผยแพร่แล้ว" : "○ ฉบับร่าง"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 1. Hero Content Section: #18181B (Monochrome Charcoal) */}
      <div className="hero-card-content lg:w-1/2 p-6 sm:p-8 sm:py-10 flex flex-col justify-between bg-[#18181B] text-white">
        <div>
          {/* Meta Data: STORY ID, วันที่, ป้ายวิดีโอ */}
          <div className="hero-meta-text flex items-center justify-between text-xs text-[#94A3B8] mb-3 font-mono">
            <div className="flex items-center gap-2">
              <span>STORY ID #{news.id}</span>
              {videoInfo && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-semibold">
                  <Play className="w-2.5 h-2.5 fill-red-400" /> วิดีโอไฮไลต์
                </span>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-[#94A3B8]">
              <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
              {news.publishedDate}
            </span>
          </div>

          {/* Large Headline */}
          <h2
            onClick={() => onView(news)}
            className="hero-card-title text-xl sm:text-2xl lg:text-3xl font-semibold text-[#FFFFFF] leading-snug tracking-tight cursor-pointer hover:text-zinc-200 transition-colors line-clamp-3 mb-4 drop-shadow-xs font-serif"
          >
            {news.title}
          </h2>

          {/* Description Excerpt */}
          <p className="hero-card-desc text-[#E2E8F0] text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-normal">
            {news.description}
          </p>
        </div>

        {/* Footer Meta & Actions */}
        <div className="pt-4 border-t border-zinc-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="hero-meta-text flex items-center gap-2 text-xs text-[#94A3B8]">
            <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[#94A3B8]">
              <User className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div>
              <div className="text-[10px] text-[#94A3B8]">ผู้รายงาน</div>
              <div className="font-semibold text-zinc-100">{news.reporter}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onView(news)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-[#18181B] text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-[#18181B]" />
              <span>อ่านข่าวเต็ม</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#18181B]" />
            </button>
            <button
              type="button"
              onClick={() => onEdit(news)}
              title="แก้ไขข่าว"
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-all cursor-pointer border border-zinc-700"
            >
              <Edit3 className="w-4 h-4 text-zinc-200" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(news)}
              title="ลบข่าว"
              className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-900/60 text-zinc-200 hover:text-rose-200 text-xs transition-all cursor-pointer border border-zinc-700 hover:border-rose-700"
            >
              <Trash2 className="w-4 h-4 text-zinc-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHeroCard;
