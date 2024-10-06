"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Modal from "./Modal";
import "./style2.css";

// Scene interface containing background and items
export interface Scene {
  id: number;
  background_scene: string;
  items?: { [key: string]: string }; // Can store multiple items as a key-value pair
  clickable?: { [key: string]: { img: string; coords: string } }; // Store clickable items with coordinates
  description: string; // Scene description
  waterLevel: number;
}

// Example scene data with related items
const scenes: Scene[] = [
  {
    id: 1,
    background_scene: "/page2_images/scene1.png",
    items: {
      item_1: "/page2_images/item1_scene1.png",
      item_2: "/page2_images/item2_scene1.png",
    },
    description:
      "This is some information about scene #001 with two related items.",
    waterLevel: 200,
  },
  {
    id: 2,
    background_scene: "/page2_images/scene2.png",
    items: {
      item_1: "/page2_images/item1_scene2.png",
    },
    description: "Scene #002 with one related item.",
    waterLevel: 1000,
  },
  {
    id: 3,
    background_scene: "/page2_images/scene3.png",
    items: {},
    description: "Scene #003 has no related items.",
    waterLevel: 2500,
  },
  {
    id: 4,
    background_scene: "/page2_images/scene4.png",
    items: {
      item_1: "/page2_images/trench_scene4.png",
      item_2: "/page2_images/smoke_vent_scene4.png",
    },
    clickable: {
      thermal_vent: {
        img: "/page2_images/thermal_vent_click_scene4.png", // Clickable image URL
        coords:
          "100,700, 200,600, 400,500, 600,450, 800,400, 1000,450, 1200,500, 1400,600, 1600,700, 1700,800, 1500,900, 1200,950, 900,1000, 700,1050, 400,1000, 200,900", // Clickable area coordinates
      },
    },
    description: "Scene #004 with three related items.",
    waterLevel: 4000,
  },
  {
    id: 5,
    background_scene: "/page2_images/scene5.png",
    items: {},
    description: "Scene #005 with no related items.",
    waterLevel: 6000,
  },
];

// Parallax function
function useParallax(value: number) {
  return useTransform(value, [0, 1], [-300, 300]);
}

// Scene component to render scenes dynamically
type SceneProps = {
  scene: Scene;
};

export function SceneComponent({ scene }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle clicks on clickable items
  const handleClick = (key: string) => {
    console.log(`${key} clicked!`);
  };

  return (
    <section
      className="section-page2"
      style={{
        backgroundImage: `url(${scene.background_scene})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
      ref={ref}
    >
      <motion.h2 style={{ y }}>{`#00${scene.id}`}</motion.h2>

      {/* Info Button */}
      <button
        className="info-button"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "20px",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        ℹ️
      </button>

      {/* Modal for displaying scene information */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={scene.description}
      />

      {/* Render related items */}
      {scene.items &&
        Object.entries(scene.items).map(([key, imageUrl]) => (
          <motion.img
            key={key}
            src={imageUrl}
            alt={key}
            className="related-item-image"
            style={{
              position: "absolute",
              bottom: `0%`, // Random position just for example
              right: `0%`,
              width: "100%",
              height: "100%",
            }}
          />
        ))}

      {/* Render clickable items using usemap */}
      {scene.clickable && (
        <>
          <img
            src={scene.clickable.thermal_vent.img}
            useMap="#clickableMap"
            alt="Clickable Image"
            style={{
              position: "absolute",
              bottom: "20%", // Adjust as needed for positioning
              right: "0%", // Adjust as needed for positioning
              width: "100%", // Adjust size as needed
              height: "100%",
            }}
          />
          <map name="clickableMap">
            <area
              shape="poly"
              coords={scene.clickable.thermal_vent.coords}
              //   href=""
              alt="Clickable Area"
              onClick={() => handleClick("thermal_vent")}
              style={{ cursor: "pointer" }} // Ensure it looks clickable
            />
          </map>
        </>
      )}
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["#87CEEB", "#00BFFF", "#1E90FF", "#1C3B73", "#002f4b"]
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const index = Math.round(latest * (scenes.length - 1));
      setCurrentIndex(index);
    });

    return () => {
      unsubscribe(); // Clean up the subscription on unmount
    };
  }, [scrollYProgress]);

  return (
    <div className="body-page2">
      <motion.div
        style={{
          backgroundColor,
          minHeight: "100vh",
          transition: "background-color 0.5s",
        }}
      >
        {/* Dynamically render scenes */}
        {scenes.map((scene) => (
          <SceneComponent scene={scene} key={scene.id} />
        ))}

        {/* Navigation bar */}
        <motion.div className="navigation-bar">
          {scenes.map((scene, index) => (
            <motion.div
              key={scene.id}
              className="nav-marker"
              style={{
                background:
                  index === currentIndex ? "var(--blue)" : "var(--white)",
                height: 20,
                width: 20,
                borderRadius: "50%",
                margin: "5px 0",
                left: "5%",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
            >
              {`${scenes[index].waterLevel}M`}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
