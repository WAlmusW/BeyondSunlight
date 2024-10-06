"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Modal from "./Modal";
import "./style2.css";
import { FiAlertCircle, FiChevronLeft } from "react-icons/fi"; // Importing the icons
import { useRouter } from "next/navigation"; // Importing the router

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
    items: {},
    description:
      "This is some information about scene #001 with two related items.",
    waterLevel: 200,
  },
  {
    id: 2,
    background_scene: "/page2_images/scene2.png",
    items: {},
    description: "Scene #002 with one related item.",
    waterLevel: 1000,
  },
  {
    id: 3,
    background_scene: "/page2_images/scene3.png",
    items: {
      item_1: "/page2_images/hunter_jellyfish.png",
      item_2: "/page2_images/flycatcher.png",
    },
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

// Modal data for each scene
const modalData = [
  {
    temperature: "298 K / 25°C",
    molecules: ["CO₂", "O₂", "NH₃", "NO₃⁻", "CH₄"],
    minerals: "Mineral Set 1",
    weather: "Sunny",
  },
  {
    temperature: "300 K / 27°C",
    molecules: ["H₂O", "N₂", "O₂"],
    minerals: "Mineral Set 2",
    weather: "Cloudy",
  },
  {
    temperature: "290 K / 17°C",
    molecules: ["CO₂", "O₂"],
    minerals: "Mineral Set 3",
    weather: "Rainy",
  },
  {
    temperature: "290 K / 17°C",
    molecules: ["CO₂", "O₂"],
    minerals: "Mineral Set 3",
    weather: "Rainy",
  },
  {
    temperature: "290 K / 17°C",
    molecules: ["CO₂", "O₂"],
    minerals: "Mineral Set 3",
    weather: "Rainy",
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
      ></button>

      {/* Modal for displaying scene information */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={scene.description}
      />

      {/* Render related items */}
      {scene.items &&
        Object.entries(scene.items).map(([key, imageUrl]) => {
          const randomBottom = Math.random() * 100; // Random value between 0 and 100 for bottom
          const randomRight = Math.random() * 100; // Random value between 0 and 100 for right
          // Define styles based on scene.id
          const styles = {
            position: "absolute",
            bottom: `${randomBottom}%`, // Use random bottom position
            right: `${randomRight}%`, // Use random right position
            width: "100%",
            height: "100%",
            ...(scene.id === 3 ? { width: 200 } : {}),
            ...(scene.id === 3 ? { height: 400 } : {}), // Example of changing opacity
            // Add more styles based on different scene.id values as needed
          };

          return (
            <motion.img
              key={key}
              src={imageUrl}
              alt={key}
              className="related-item-image"
              style={styles}
            />
          );
        })}

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
  const router = useRouter(); // Initialize router for navigation

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const index = Math.round(latest * (scenes.length - 1));
      setCurrentIndex(index);
    });

    return () => {
      unsubscribe(); // Clean up the subscription on unmount
    };
  }, [scrollYProgress]);

  function closeModal(): void {
    setIsModalOpen(false);
  }

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
          {/* Back Button when currentIndex is 0 */}
          {currentIndex === 0 && (
            <button
              style={{
                position: "absolute",
                top: "0%",
                right: "1300px", // Adjust position as needed
              }}
              onClick={() => router.back()}
            >
              <FiChevronLeft className="text-white text-5xl" />
            </button>
          )}
          <button
            style={{
              position: "absolute",
              top: "0%",
              right: "1200px", // Adjust position as needed
            }}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FiAlertCircle className="text-white text-5xl" />
          </button>
          {/* Modal for displaying scene information */}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              content={
                <>
                  <div>Temperature: {modalData[currentIndex].temperature}</div>
                  <div>
                    Molecules: {modalData[currentIndex].molecules.join(", ")}
                  </div>
                  <div>Minerals: {modalData[currentIndex].minerals}</div>
                  <div>Weather: {modalData[currentIndex].weather}</div>
                </>
              }
            />
          )}
          {scenes.map((scene, index) => (
            <motion.div
              key={scene.id}
              className="nav-button"
              onClick={() => {
                setCurrentIndex(index);
                // Handle navigation if necessary
              }}
            >
              <span>{`${scene.waterLevel}M`}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
