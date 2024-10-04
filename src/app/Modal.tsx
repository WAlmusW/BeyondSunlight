"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CelestialObject } from "./CelestialObject";

interface ModalProps {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  items: CelestialObject[];
}

const Modal: React.FC<ModalProps> = ({ selectedId, setSelectedId, items }) => {
  return (
    <AnimatePresence>
      {selectedId && (
        <motion.div
          layoutId={selectedId.toString()}
          className="modal"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {items
            .filter((item) => item.id === selectedId)
            .map((item) => (
              <div key={item.id}>
                <motion.h2>{item.name}</motion.h2>
                <motion.h5>{item.description}</motion.h5>
              </div>
            ))}
          <motion.button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedId(null)}
          >
            Close
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
