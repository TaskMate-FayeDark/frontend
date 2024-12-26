import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 45) % 360);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-16 h-16">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-primary rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 -24px",
          }}
          animate={{
            rotate: rotation + index * 45,
            opacity: 1 - index * 0.1,
          }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
      ))}
    </div>
  );
}
