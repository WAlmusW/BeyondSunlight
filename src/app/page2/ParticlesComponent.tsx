import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Particle Engine
import { ISourceOptions } from "@tsparticles/engine";

// Particle configuration
const particleOptions: ISourceOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 10,
      random: true,
      anim: { enable: false, speed: 80, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 12,
      direction: "right",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 800, line_linked: { opacity: 1 } },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

interface ParticlesComponentProps {
  currentIndex: number; // The current scene index
  sceneRange: { start: number; end: number }; // The range of scenes where particles should be shown
}

export default function ParticlesComponent({
  currentIndex,
  sceneRange,
}: ParticlesComponentProps) {
  // Conditionally render particles only for the specified scene range
  if (currentIndex < sceneRange.start || currentIndex > sceneRange.end) {
    return null; // Don't render particles if currentIndex is outside the range
  }

  return <Particles id="tsparticles" options={particleOptions} />;
}
