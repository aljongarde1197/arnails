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

  const slideWidth = 320;
  const slideHeight = 420;
  const gap = 16;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  /* Measure container width */
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      setContainerWidth(containerRef.current.offsetWidth);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Play / pause logic */
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

  const prev = () => setCurrentIndex((i) => i - 1);
  const next = () => setCurrentIndex((i) => i + 1);
  const togglePlay = () => setIsPaused((p) => !p);

  /* Center active slide */
  const x =
    -(currentIndex * (slideWidth + gap)) +
    containerWidth / 2 -
    slideWidth / 2;

  return (
    <section className="py-10 overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[480px] flex items-center"
      >
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={prev}
            aria-label="Previous video"
            className="absolute left-2 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white"
          >
            <HiChevronLeft className="w-6 h-6 text-black" />
          </button>
        )}

        {/* Carousel viewport */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex gap-4 will-change-transform"
            animate={{ x }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {videos.map((video, index) => {
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={index}
                  onClick={
                    isActive
                      ? togglePlay
                      : () => setCurrentIndex(index)
                  }
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative flex-shrink-0 cursor-pointer rounded-xl bg-black overflow-hidden"
                  style={{
                    width: slideWidth,
                    height: slideHeight,
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

                  {/* Pause overlay */}
                  {isActive && isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-black text-xl">
                        ⏸
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Arrow */}
        {currentIndex < videos.length - 1 && (
          <button
            onClick={next}
            aria-label="Next video"
            className="absolute right-2 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white"
          >
            <HiChevronRight className="w-6 h-6 text-black" />
          </button>
        )}
      </div>
    </section>
  );
}
