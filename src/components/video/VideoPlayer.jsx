"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function VideoPlayer({ thumbnail, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(12);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(true)}
    >
      {/* Video Thumbnail/Frame */}
      <div className="aspect-video relative">
        <img
          src={
            thumbnail ||
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop"
          }
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Center Play Button */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#E45858] hover:bg-[#d14545] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl shadow-[#E45858]/40"
          >
            <Play className="w-8 h-8 text-white fill-white mr-[-4px]" />
          </button>
        )}

        {/* Controls Bar */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[progress]}
              onValueChange={(val) => setProgress(val[0])}
              max={100}
              step={1}
              className="cursor-pointer [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-[#E45858] [&_[role=slider]]:border-0 [&_.bg-primary]:bg-[#E45858] [&_.bg-secondary]:bg-white/30"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white mr-[-2px]" />
                )}
              </button>

              <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipBack className="w-4 h-4 text-white" />
              </button>

              <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipForward className="w-4 h-4 text-white" />
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

              <span className="text-white text-sm font-medium">
                ۰۰:۴۶ / ۳۰:۴۵
              </span>
            </div>

            <button className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
