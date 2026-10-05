"use client";

import { motion, useReducedMotion } from "framer-motion";

type Segment = {
  text: string;
  className?: string;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
};

const letter = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AnimatedLetters({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className }))
  );

  if (reduceMotion) {
    return (
      <h2 className={className}>
        {words.map(({ word, className: wordClass }, i) => (
          <span key={i} className={wordClass}>
            {word}{" "}
          </span>
        ))}
      </h2>
    );
  }

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
      aria-label={segments.map((s) => s.text).join(" ")}
    >
      {words.map(({ word, className: wordClass }, i) => (
        <span key={i} aria-hidden className={wordClass}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, j) => (
              <motion.span key={j} variants={letter} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>{" "}
        </span>
      ))}
    </motion.h2>
  );
}
