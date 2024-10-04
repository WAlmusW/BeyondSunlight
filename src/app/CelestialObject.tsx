"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal"; // Import the Modal component

export interface CelestialObject {
  name: string;
  id: number;
  startPos: [number, number, number];
  endPos: [number, number, number];
  curPos: [number, number, number];
  description?: string;
  icon?: string;
}

const Section1 = () => {
  const [scrollCount, setScrollCount] = useState(0); // Count scroll events
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Scroll event listener to detect scroll up/down
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && scrollCount === 0) {
        setScrollCount(1);
      } else if (event.deltaY < 0 && scrollCount === 1) {
        setScrollCount(0);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollCount]);

  const sun: CelestialObject = {
    name: "Sun",
    id: 1,
    startPos: [-1000, -300, 1],
    endPos: [1000, 150, 1.3],
    curPos: scrollCount === 0 ? [-1000, -300, 1] : [1000, 150, 1.3],
    description: "Sun is the star",
  };

  const planet: CelestialObject = {
    name: "Planet",
    id: 2,
    startPos: [10, 10, 1],
    endPos: [600, -350, 0.7],
    curPos: scrollCount === 0 ? [10, 10, 1] : [600, -350, 0.7],
    description: "The planet is weird af",
  };

  const items = [sun, planet];

  return (
    <div>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={item.id.toString()}
          className={item.name}
          animate={{
            x: item.curPos[0],
            y: item.curPos[1],
            scale: item.curPos[2],
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => {
            if (scrollCount > 0) {
              setSelectedId(item.id);
            }
          }}
          style={{ cursor: scrollCount > 0 ? "pointer" : "default" }}
        ></motion.div>
      ))}

      {/* Modal for selected item */}
      <Modal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={items}
      />
    </div>
  );
};

export default Section1;
