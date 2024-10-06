"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "./Page1.css";

export interface CelestialObject {
  classname: string;
  name: string;
  id: number;
  curPos: number[];
  description?: string;
  descPos: number[];
  props2Pos: number[];
  icon?: string;
}

function removeOverflowHidden() {
  document.body.style.overflow = "visible";
}

function putOverflowHidden() {
  document.body.style.overflow = "hidden";
}

const CelestialObject = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    putOverflowHidden();
  });

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

  // Resize event listener to detect different screen sizes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const goToPage2 = () => {
    removeOverflowHidden();
    router.push("/page2");
  };

  const calculatePos = (
    xPercentage: number,
    yPercentage: number,
    scale: number
  ) => {
    const x = (xPercentage / 100) * (windowWidth ? windowWidth : 1);
    const y = (yPercentage / 100) * (windowHeight ? windowHeight : 1);
    return [x, y, scale];
  };

  const sun: CelestialObject = {
    classname: "the-dwarf-star",
    name: "Blue Giant",
    id: 1,
    curPos: (() => {
      if (scrollCount === 0) {
        // Start Position
        return calculatePos(-100, -100, 1);
      } else if (scrollCount > 0 && selectedId === 1) {
        // Blue Gianr Focused Position
        return calculatePos(0, -50, 0.85);
      } else if (scrollCount > 0 && selectedId === 2) {
        // EGO Focused Position
        return calculatePos(-35, -75, 0.3);
      } else if (scrollCount > 0) {
        // Option Position
        return calculatePos(-20, -60, 1.2);
      } // Start Position
      return calculatePos(-50, -50, 1);
    })(),
    description:
      "This type of star emits a bright blue light from its temperature. Type 3 luminosity and more than 3.7 times hotter than the sun, making it unlikely for life to appear on its orbiting planets.",
    descPos: calculatePos(-22, -50, 1),
    props2Pos: calculatePos(0, 0, 0),
  };

  const planet: CelestialObject = {
    classname: "cerulean",
    name: "Cerulean",
    id: 2,
    curPos: (() => {
      if (scrollCount === 0) {
        // Start position
        return calculatePos(0, 100, 3);
      } else if (scrollCount > 0 && selectedId === 1) {
        // Blue Gianr Focused Position
        return calculatePos(35, -75, 0.3);
      } else if (scrollCount > 0 && selectedId === 2) {
        // EGO Focused Position
        return calculatePos(0, -50, 0.85);
      } else if (scrollCount > 0) {
        // Option Position
        return calculatePos(33, -42, 0.65);
      } // Start Position
      return calculatePos(0, 100, 3);
    })(),
    description:
      "Cerulean is a rocky exoplanet orbiting a blue giant star. This planet orbits far enough to be in the star’s goldilock zone. With the surface covered entirely out of water, making it possible for life thrive in this planet.",
    descPos: calculatePos(49, -50, 1),
    props2Pos: (() => {
      if (scrollCount === 0) {
        return calculatePos(0, -20, 3);
      } else {
        return calculatePos(0, -25, 0);
      }
    })(),
  };

  const items = [sun, planet];

  return (
    <div>
      <motion.div
        animate={{
          x: items[1].props2Pos[0],
          y: items[1].props2Pos[1],
          scale: items[1].props2Pos[2],
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 10,
        }}
        className="title"
      >
        Have You Ever Wonder?
      </motion.div>
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
        <>
          <motion.div
            className="infographic"
            animate={{
              x: items[selectedId - 1].descPos[0],
              y: items[selectedId - 1].descPos[1],
              scale: items[selectedId - 1].descPos[2],
            }}
          >
            <div className="name montserrat-font-name">
              {items.find((item) => item.id === selectedId)?.name}
            </div>
            <div className="description montserrat-font-description">
              {items.find((item) => item.id === selectedId)?.description}
            </div>
          </motion.div>
          {scrollCount > 0 && selectedId === 2 && (
            <motion.button
              className="custom-button"
              animate={{
                x: calculatePos(9, 0, 0)[0],
                y: calculatePos(0, 75, 0)[1],
                opacity: 1,
                scale: 1,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={goToPage2}
            >
              Enter
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default CelestialObject;
