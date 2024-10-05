"use client";
// Photos from https://citizenofnowhe.re/lines-of-the-city
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./style2.css";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

function useParallax(value: MotionValue<number>) {
  return useTransform(value, [0, 1], [-300, 300]); // Parallax distance
}

function putOverflowHidden() {
  document.body.style.overflow = "hidden";
}

function ImageCustom({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress);

  return (
    <section className="section-page2">
      <div ref={ref}>
        {/* <video src="/1.mp4" autoPlay loop muted></video> */}
        <Image
          src={`/images/${id}.jpg`}
          alt="A London skyscraper"
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

  // Define background color based on scroll position
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

  const imageCount = 5; // Total number of images
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const cookieName = "page2Reloaded"; // Unique cookie for page 2
  const router = useRouter();

  useEffect(() => {
    const hasReloaded = Cookies.get(cookieName);

    if (!hasReloaded) {
      // If page 2 hasn't been reloaded, set the cookie and reload the page
      Cookies.set(cookieName, "true", { expires: 1 }); // Set cookie to expire in 1 day
      // Mark other pages as not reloaded
      Cookies.set("page1Reloaded", "false");
      Cookies.set("page3Reloaded", "false");
      window.location.reload(); // Reload the page
    }

    return () => {
      // Optionally remove the cookie when leaving the page
      // Cookies.remove(cookieName);
    };
  }, [router]);

  return (
    <div className="body-page2">
      <motion.div
        style={{
          backgroundColor,
          minHeight: "100vh",
          transition: "background-color 0.5s",
        }}
      >
        {[1, 2, 3, 4, 5].map((image) => (
          <ImageCustom id={image} key={image} />
        ))}
        {/* <motion.div className="progress" style={{ scaleX }} /> */}
        <motion.div className="navigation-bar">
          {Array.from({ length: imageCount }).map((_, index) => (
            <motion.div
              key={index}
              className="nav-marker"
              style={{
                background:
                  index === currentIndex ? "var(--blue)" : "var(--white)",
                height: 20,
                width: 20,
                borderRadius: "50%",
                margin: "5px 0",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
            >
              {index + 1}00M
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
