"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import "./style2.css";
import { FiAlertCircle, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import {
//   type Container,
//   type ISourceOptions,
//   MoveDirection,
//   OutMode,
// } from "@tsparticles/engine";
// import { loadSlim } from "@tsparticles/slim"; // Particle Engine

function useParallax(value: MotionValue<number>) {
  return useTransform(value, [0, 1], [-300, 300]);
}

function ImageCustom({ id }: { id: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress);

  return (
    <section
      className="section-page2"
      style={{
        backgroundImage: `url(/page2_images/scene${id}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      ref={ref}
    >
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  //   const particleOptions: ISourceOptions = useMemo(
  //     () => ({
  //       particles: {
  //         number: {
  //           value: 80,
  //           density: {
  //             enable: true,
  //             value_area: 800,
  //           },
  //         },
  //         color: {
  //           value: "#ffffff",
  //         },
  //         shape: {
  //           type: "circle",
  //           stroke: {
  //             width: 0,
  //             color: "#000000",
  //           },
  //           polygon: {
  //             nb_sides: 5,
  //           },
  //           image: {
  //             src: "img/github.svg",
  //             width: 100,
  //             height: 100,
  //           },
  //         },
  //         opacity: {
  //           value: 0.5,
  //           random: false,
  //           anim: {
  //             enable: false,
  //             speed: 1,
  //             opacity_min: 0.1,
  //             sync: false,
  //           },
  //         },
  //         size: {
  //           value: 10,
  //           random: true,
  //           anim: {
  //             enable: false,
  //             speed: 80,
  //             size_min: 0.1,
  //             sync: false,
  //           },
  //         },
  //         line_linked: {
  //           enable: true,
  //           distance: 300,
  //           color: "#ffffff",
  //           opacity: 0.4,
  //           width: 2,
  //         },
  //         move: {
  //           enable: true,
  //           speed: 12,
  //           direction: MoveDirection.none, // Converted to MoveDirection enum
  //           random: false,
  //           straight: false,
  //           out_mode: OutMode.out, // Converted to OutMode enum
  //           bounce: false,
  //           attract: {
  //             enable: false,
  //             rotateX: 600,
  //             rotateY: 1200,
  //           },
  //         },
  //       },
  //       interactivity: {
  //         detect_on: "canvas",
  //         events: {
  //           onhover: {
  //             enable: false,
  //             mode: "repulse",
  //           },
  //           onclick: {
  //             enable: true,
  //             mode: "push",
  //           },
  //           resize: {
  //             enable: true,
  //           },
  //         },
  //         modes: {
  //           grab: {
  //             distance: 800,
  //             line_linked: {
  //               opacity: 1,
  //             },
  //           },
  //           bubble: {
  //             distance: 800,
  //             size: 80,
  //             duration: 2,
  //             opacity: 0.8,
  //             speed: 3,
  //           },
  //           repulse: {
  //             distance: 400,
  //             duration: 0.4,
  //           },
  //           push: {
  //             particles_nb: 4,
  //           },
  //           remove: {
  //             particles_nb: 2,
  //           },
  //         },
  //       },
  //       retina_detect: true,
  //     }),
  //     []
  //   );

  //   const particlesLoaded = async (container?: Container): Promise<void> => {
  //     console.log(container);
  //   };

  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["#87CEEB", "#00BFFF", "#1E90FF", "#1C3B73", "#002f4b"]
  );

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

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const imageCount = 5; // Total number of images
  const waterLevel = ["200M", "1000M", "2500M", "4000M", "6000M"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Calculate the current image index based on the scroll progress
      const index = Math.round(latest * (imageCount - 1));
      setCurrentIndex(index);
    });

    return () => {
      unsubscribe(); // Clean up the subscription on unmount
    };
  }, [scrollYProgress, imageCount]);

  return (
    <div className="body-page2">
      <motion.div
        style={{
          backgroundColor,
          minHeight: "100vh",
          transition: "background-color 0.5s",
        }}
      >
        {[...Array(imageCount)].map((_, index) => (
          <ImageCustom id={index + 1} key={index} />
        ))}

        {/* Conditionally render particles for scenes 2 to 5 */}
        {/* {currentIndex >= 1 && currentIndex <= 4 && (
          <Particles
            id="tsparticles"
            options={particleOptions}
            particlesLoaded={particlesLoaded}
          />
        )} */}

        <motion.div className="navigation-bar">
          {/* Back Button when currentIndex is 0 */}
          {currentIndex === 0 && (
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "1000px",
                // backgroundColor: "transparent",
                // color: "var(--blue)",
                // padding: "10px",
                // borderRadius: "50%",
                // cursor: "pointer",
                // border: "none",
              }}
              onClick={() => router.back()}
            >
              <FiChevronLeft className="text-white text-5xl" />
            </button>
          )}
          <button
            style={{
              position: "absolute",
              top: "140px",
              right: "1000px",
            }}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FiAlertCircle className="text-white text-5xl" />
          </button>
          {isModalOpen && (
            <div
              style={{
                position: "absolute",
                top: "120px",
                right: "650px",
                width: "300px",
                height: "350px",
              }}
              className="bg-gray-200 opacity-50 text-black rounded-lg pl-6 pt-6 text-3xl"
            >
              Temp: {modalData[currentIndex].temperature} <br />
              Molecules: {modalData[currentIndex].molecules} <br />
              Minerals: {modalData[currentIndex].minerals} <br />
              Weather: {modalData[currentIndex].weather} <br />
            </div>
          )}
          {Array.from({ length: imageCount }).map((_, index) => (
            <motion.div
              key={index}
              className="nav-marker"
              style={{
                background:
                  index === currentIndex ? "var(--dusk)" : "var(--white)",
                height: 20,
                width: 20,
                borderRadius: "50%",
                margin: "5px 0",
                left: "5%",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
            >
              <div
                className="ml-6"
                style={{
                  fontSize: index === currentIndex ? "16px" : "12px",
                  color: index === currentIndex ? "var(--red)" : "var(--white)",
                }}
              >
                {waterLevel[index]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
