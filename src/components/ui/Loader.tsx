import { useEffect, useState } from "react";
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LampDemo } from "./Lamp";

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000); // Loader disappears after 2.5s
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-opacity duration-1000 ${
        fadeOut ? "transition-all opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <LampDemo />
    </div>
  );
}
