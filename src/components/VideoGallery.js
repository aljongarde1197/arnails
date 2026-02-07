"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function VideoGallery() {
  const videos = [
    { title: "Elegant French Tips", src: "/videos/video_1.mp4" },
    { title: "Floral Nail Art", src: "/videos/video_2.mp4" },
    { title: "Glitter Glam", src: "/videos/video_3.mp4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef([]);

  /* Play / pause logic for current video only */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentIndex) {
        video.currentTime = 0;
        isPaused ? video.pause() : video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isPaused]);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === videos.length - 1 ? 0 : i + 1));
  const togglePlay = () => setIsPaused((p) => !p);

  const slideWidth = 320; // width of one video
  const gap = 16; // space between videos
  const peek = 80; // how much of prev/next video to show

  return (
    <section className="py-10 overflow-hidden">
      <div className="relative max-w-[480px] mx-auto flex items-center justify-center">

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-10 p-2 bg-white/80 hover:bg-white/90 rounded-full shadow-lg backdrop-blur-md transition"
          aria-label="Previous video"
        >
          <HiChevronLeft className="w-6 h-6 text-black" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex"
            animate={{
              x: `calc(-${currentIndex} * (${slideWidth}px + ${gap}px) + ${peek}px)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {videos.map((video, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={index}
                  onClick={isActive ? togglePlay : () => setCurrentIndex(index)}
                  className="relative w-[320px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-black cursor-pointer"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(0.85)",
                    opacity: isActive ? 1 : 0.5,
                    transition: "transform 0.3s, opacity 0.3s",
                  }}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    autoPlay={isActive}
                  />

                  {/* ⏸ Pause overlay */}
                  {isActive && isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-10 p-2 bg-white/80 hover:bg-white/90 rounded-full shadow-lg backdrop-blur-md transition"
          aria-label="Next video"
        >
          <HiChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </section>
  );
}
