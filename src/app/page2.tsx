"use client";

import { useRef, useState, useEffect } from "react";
import "./styles.css";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

function useParallax(value: MotionValue<number>) {
  return useTransform(value, [0, 1], [-300, 300]); // Parallax distance
}

function ImageCustom({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress);

  return (
    <section>
      <div ref={ref}>
        <Image
          src={`/images/${id}.jpg`}
          alt={`Image ${id}`}
          width={600}
          height={400}
        />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const imageCount = 5; // Total number of images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("/1.mp4"); // Initial background video

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const index = Math.round(latest * (imageCount - 1));
      setCurrentIndex(index);
    });

    return () => {
      unsubscribe(); // Clean up subscription on unmount
    };
  }, [scrollYProgress, imageCount]);

  // Update video whenever currentIndex changes
  useEffect(() => {
    setCurrentVideo(`/${currentIndex + 1}.mp4`); // Update video based on index
  }, [currentIndex]);

  return (
    <div>
      {/* Dynamic Background Video */}
      <video
        className="background-video"
        src={currentVideo}
        autoPlay
        loop
        muted
      />

      {/* Main Content */}
      <motion.div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 2, // Ensures content is above the video
        }}
      >
        {/* Render images based on currentIndex */}
        <ImageCustom id={currentIndex + 1} />

        <motion.div className="navigation-bar">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div key={index} className="nav-item">
              <span
                className="nav-text"
                style={{
                  fontSize: index === currentIndex ? "20px" : "14px",
                  fontWeight: index === currentIndex ? "bold" : "normal",
                }}
              >
                {index + 1}00M
              </span>
              <div
                onClick={() => {
                  setCurrentIndex(index);
                }}
                className="nav-marker"
                style={{
                  background:
                    index === currentIndex ? "var(--blue)" : "var(--red)",
                  height: 20,
                  width: 20,
                  borderRadius: "50%",
                  margin: "5px 0",
                  opacity: index === currentIndex ? 1 : 0.5,
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
