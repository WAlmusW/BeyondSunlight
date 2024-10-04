"use client";

// React
import { motion, useScroll, useTransform } from "framer-motion";

// React Server Components
// import * as motion from "framer-motion/client";

export default function Home() {
  // Access scroll data using useScroll
  const { scrollYProgress } = useScroll();

  // Transform the background color from sky blue to deep ocean blue
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1], // Add intermediate steps for smoother transition
    ["#87CEEB", "#00BFFF", "#1E90FF", "#1C3B73", "#002f4b"] // From light sky blue to deep ocean blue
  );

  // Scale the fish/bubbles as we scroll (appear larger as we scroll down)
  const fishScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);

  return (
    <motion.div
      style={{
        backgroundColor,
        height: "200vh", // Ensure enough height to scroll
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Dive into the Ocean</h1>

      {/* Fish/Bubble animation */}
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "lightcoral",
          borderRadius: "50%", // Round bubble/fish
          scale: fishScale, // Scale effect on scroll
          position: "absolute",
          bottom: "10%", // Start at bottom of the viewport
        }}
      >
        <p style={{ color: "white" }}>🐠</p> {/* Representing a fish */}
      </motion.div>

      <motion.div
        style={{
          width: 50,
          height: 50,
          backgroundColor: "lightblue",
          borderRadius: "50%",
          position: "absolute",
          bottom: "20%", // Start a bit higher than the fish
          right: "20%",
        }}
      >
        {/* Another bubble */}
      </motion.div>
    </motion.div>
  );
}
