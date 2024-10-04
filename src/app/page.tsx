"use client";

import React, { useState } from "react";
import Section1 from "./CelestialObject"; // Import the Section1 component

const Pages = () => {
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <div>
      <section id="section1" className="section">
        <Section1 />
        Section 1
      </section>

      {currentSection >= 2 && (
        <section id="section2" className="section">
          Section 2
        </section>
      )}
      {currentSection >= 3 && (
        <section id="section3" className="section">
          Section 3
        </section>
      )}
      {currentSection >= 4 && (
        <section id="section4" className="section">
          Section 4
        </section>
      )}
      {currentSection >= 5 && (
        <section id="section5" className="section">
          Section 5
        </section>
      )}
    </div>
  );
};

export default Pages;
