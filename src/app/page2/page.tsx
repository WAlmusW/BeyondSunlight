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
      item_3: "/page2_images/thermal_vent_click_scene4.png",
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
              bottom: `${Math.random() * 50 + 20}%`, // Random position just for example
              right: `${Math.random() * 50 + 10}%`,
              width: "100%",
              height: "100%",
            }}
          />
        ))}
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
