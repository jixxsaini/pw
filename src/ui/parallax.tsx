"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Carousel } from "./carousel";
import { Card } from "./card";
export const Parallax = ({ products }: { products: any[] }) => {
  const firstRow = products.slice(0, 5);
  // const secondRow = products.slice(5, 10);
  // const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const divRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };
  // const translateX = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, 2000]),
  //   springConfig
  // );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [16, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.01], [-400, 0]),
    springConfig
  );
  const cards = firstRow.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div
      id="projects"
      ref={ref}
      className="pb-auto overflow-hidden items-center antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-night"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        ref={divRef}
        className="w-[98%] overflow-hidden mr-10 ml-10 mt-auto"
      >
        <motion.div className="flex justify-center w-screen mb-5 space-x-8 ">
          <Carousel items={cards} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-[10rem] py-10 md:py-20 px-4 w-full z-10">
      <h1 className="text-2xl md:text-7xl font-bold text-primary">Work</h1>
      <p className="max-w-2xl text-base md:text-xl mt-8   ">
        I build beautiful products with the latest technologies and frameworks.
        <br />
        <br />
        My projects reflect a blend of innovation and practicality.
        <br />
        <br /> I thrived on turning complex challenges into elegant,
        user-focused solutions that made a real difference.
      </p>
    </div>
  );
};
