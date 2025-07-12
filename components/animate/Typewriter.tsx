"use client";

import React, { useState, useEffect } from "react";

const Typewriter = ({
  texts,
  className = "",
  deleteDelay = 1500,
}: {
  texts: string[];
  className?: string;
  deleteDelay?: number;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [waitBeforeDeleting, setWaitBeforeDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting && displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else if (isDeleting && displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else if (
          displayText.length === currentText.length &&
          !waitBeforeDeleting
        ) {
          setWaitBeforeDeleting(true);
          setTimeout(() => setIsDeleting(true), deleteDelay);
        } else if (isDeleting && displayText.length === 0) {
          setWaitBeforeDeleting(false);
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [
    currentTextIndex,
    displayText,
    isDeleting,
    texts,
    waitBeforeDeleting,
    deleteDelay,
  ]);

  return <p className={className}>{displayText}</p>;
};

export default Typewriter;
