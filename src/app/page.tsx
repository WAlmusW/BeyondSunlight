"use client";

import React, { useState } from "react";
import CelestialObject from "./CelestialObject";
import "./Page1.css";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animation
import { useRouter } from "next/navigation"; // Ensure you import useRouter

const Pages = () => {
  const [exitTrigger, setExitTrigger] = useState(0);
  const router = useRouter();

  // Animation settings
  const animate_list = [
    { opacity: 1, scale: 1 }, // Initial state
    { opacity: 0, scale: 20 }, // Exit state
  ];

  // Function to trigger animation and routing
  const handleGoToPage2 = () => {
    setExitTrigger(1); // Trigger exit animation
    setTimeout(() => {
      router.push("/page2"); // Navigate to page 2 after animation
    }, 1000); // Adjust the timeout based on the animation duration
  };

  return (
    <AnimatePresence>
      <motion.div
        className="body-page1"
        animate={animate_list[exitTrigger]} // Use the correct object for animation
        transition={{ duration: 0.4 }} // Adjust the duration as needed
      >
        <section id="section1" className="section advent-pro-title">
          <CelestialObject onButtonClick={handleGoToPage2} />{" "}
          {/* Pass the function as a prop */}
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Pages;
