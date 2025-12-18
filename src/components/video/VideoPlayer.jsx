"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useCompleteLesson } from "@/hooks/useCompleteLesson";

export default function VideoPlayer({
  videoUrl,
  title,
  courseId,
  lessonId,
  onVideoEnd,
}) {
  const videoRef = useRef(null);
  const { mutate: completeLesson, isPending } = useCompleteLesson();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const hasVideo = Boolean(videoUrl);

  // وقتی ویدیو به آخر رسید → درس رو کامل کن
  const handleVideoEnd = () => {
    if (courseId && lessonId) {
      completeLesson(
        { courseId, lessonId },
        {
          onSuccess: () => {
            console.log("درس با موفقیت کامل شد!");
            if (onVideoEnd) onVideoEnd();
          },
          onError: (error) => {
            console.error("خطا در ثبت تکمیل درس:", error);
          },
        }
      );
    } else if (onVideoEnd) {
      onVideoEnd();
    }
  };

  // آپدیت پیشرفت
  const handleTimeUpdate = (e) => {
    const percent = (e.target.currentTime / e.target.duration) * 100;
    setProgress(percent || 0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    if (!videoRef.current) return;
    const time = (value[0] / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(value[0]);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-black shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="aspect-video relative">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted={isMuted}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
            <Maximize className="w-16 h-16 opacity-50 mb-4" />
            <p className="text-lg">ویدیویی برای این درس موجود نیست</p>
          </div>
        )}

        {/* پلی وسط صفحه */}
        {!isPlaying && hasVideo && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-[#E45858] fill-[#E45858] ml-1" />
            </div>
          </button>
        )}

        {/* در حال ثبت تکمیل */}
        {isPending && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <p className="text-white text-lg font-medium">
              در حال ثبت تکمیل درس...
            </p>
          </div>
        )}

        {/* کنترل‌ها */}
        {hasVideo && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}
          >
            {/* اسلایدر پیشرفت */}
            <div className="mb-3">
              <Slider
                value={[progress]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="cursor-pointer [&_[role=slider]]:bg-[#E45858] [&_.bg-primary]:bg-[#E45858]"
              />
            </div>

            {/* دکمه‌های کنترل */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* عنوان درس زیر ویدیو */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
    </div>
  );
}
