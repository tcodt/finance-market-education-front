"use client";

import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  VideoOff,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function VideoPlayer({ videoUrl, thumbnail, title }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const hasVideo = Boolean(videoUrl);

  const togglePlay = () => {
    if (!hasVideo) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(true)}
    >
      <div className="aspect-video relative">
        {/* ================= VIDEO ================= */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted={isMuted}
            className="w-full h-full object-cover"
            onTimeUpdate={(e) => {
              const percent = (e.target.currentTime / e.target.duration) * 100;
              setProgress(percent || 0);
            }}
          />
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={
                thumbnail ||
                "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop"
              }
              alt={title}
              className="w-full h-full object-cover opacity-70"
            />

            {/* No Video Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3">
              <VideoOff className="w-14 h-14 opacity-80" />
              <span className="text-sm opacity-80">
                ویدیویی برای این جلسه وجود ندارد
              </span>
            </div>
          </>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Center Play Button */}
        {!isPlaying && hasVideo && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#E45858] hover:bg-[#d14545] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl shadow-[#E45858]/40"
          >
            <Play className="w-8 h-8 text-white fill-white mr-[-4px]" />
          </button>
        )}

        {/* ================= CONTROLS ================= */}
        {hasVideo && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Progress */}
            <div className="mb-4">
              <Slider
                value={[progress]}
                onValueChange={(val) => {
                  const time = (val[0] / 100) * videoRef.current.duration;
                  videoRef.current.currentTime = time;
                  setProgress(val[0]);
                }}
                max={100}
                step={1}
                className="cursor-pointer [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-[#E45858] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[#E45858] [&_.bg-secondary]:bg-white/30"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white mr-[-2px]" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                <Maximize className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
