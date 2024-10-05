"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface CelestialObject {
  classname: string;
  name: string;
  id: number;
  startPos: [number, number, number];
  optionPos: [number, number, number];
  sunFocusPos: [number, number, number];
  planetFocusPos: [number, number, number];
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
        setSelectedId(null);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollCount]);

  function handleClick(itemId: number) {
    if (scrollCount > 0) {
      setSelectedId(selectedId);
    }
  }

  const sun: CelestialObject = {
    classname: "the-dwarf-star",
    name: "The Dwarf Star",
    id: 1,
    startPos: [-1000, -300, 1],
    optionPos: [1000, 150, 1.3],
    sunFocusPos: [1350, 300, 0.85],
    planetFocusPos: [1500, -300, 0.3],
    curPos: (() => {
      if (scrollCount === 0) {
        return [-1000, -300, 1];
      } else if (scrollCount > 0 && selectedId === 1) {
        return [1350, 300, 0.85];
      } else if (scrollCount > 0 && selectedId === 2) {
        return [1950, 100, 0.3];
      } else if (scrollCount > 0) {
        return [1050, 200, 1.2];
      }
      return [-1000, -300, 1];
    })(),
    description:
      'A dwarf star is a star of relatively small size and low luminosity. Most main sequence stars are dwarf stars. The meaning of the word "dwarf" was later extended to some star-sized objects that are not stars, and compact stellar remnants that are no longer stars.',
  };

  const planet: CelestialObject = {
    classname: "ego",
    name: "EGO",
    id: 2,
    startPos: [0, 690, 3],
    optionPos: [500, -270, 0.65],
    sunFocusPos: [550, -550, 0.3],
    planetFocusPos: [0, -350, 0.85],
    curPos: (() => {
      if (scrollCount === 0) {
        return [0, 690, 3];
      } else if (scrollCount > 0 && selectedId === 1) {
        return [550, -550, 0.3];
      } else if (scrollCount > 0 && selectedId === 2) {
        return [0, -350, 0.85];
      } else if (scrollCount > 0) {
        return [500, -270, 0.65];
      }
      return [0, 0, 1];
    })(),
    description:
      "Exoplanet EGO orbits a distant star in the black depths of the cosmos, a mysterious world entirely covered by water. Its surface is perpetually dark, as the thick clouds of toxic gases block out most of the faint sunlight. There are no continents, no islands, no towering mountains—only a vast, unbroken ocean that spans the entire planet. Its waters are unusually dense, with a chemical composition unlike any known on Earth, giving them an almost metallic sheen under faint starlight.",
  };

  const items = [sun, planet];

  return (
    <div>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={item.id.toString()}
          className={item.classname}
          animate={{
            x: item.curPos[0],
            y: item.curPos[1],
            scale: item.curPos[2],
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => {
            if (scrollCount > 0) {
              console.log("Scroll Count: ", scrollCount);
              setSelectedId(item.id);
              console.log("Selected Id: ", selectedId);
            }
          }}
          style={{ cursor: scrollCount > 0 ? "pointer" : "default" }}
        ></motion.div>
      ))}
      {/* Display text when a celestial object is focused */}
      {selectedId !== null && (
        <div className="infographic">
          <div className="name montserrat-font-name">
            {items.find((item) => item.id === selectedId)?.name}
          </div>
          <div className="description montserrat-font-description">
            {items.find((item) => item.id === selectedId)?.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1;
