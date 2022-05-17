import React from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const Banner = (props) => {
  const { title, subtitle, imgUrl } = props;
  const handleOnPlay = () => {
    console.log("play");
  };

  return (
    <div className="w-full relative h-[80vh] mb-12 border">
      <div className="absolute z-10 w-full h-full">
        <div className="flex flex-col justify-start h-full pl-16 pr-16 mt-24">
          <div className="flex gap-x-2">
            <p className="text-6xl font-extrabold leading-none text-red10 text-shadow">
              N
            </p>
            <p className="self-center text-sm leading-5 text-white text-shadow">
              M O V I E
            </p>
          </div>
          <h3 className="text-2xl font-extrabold leading-8 text-shadow text-white10">
            {title}
          </h3>
          <h6 className="text-lg leading-7 text-white10 text-shadow">
            {subtitle}
          </h6>

          <div className="flex flex-row w-full">
            <motion.button
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              className="flex items-center justify-center w-32 pt-2 pb-2 pl-5 pr-5 mt-5 text-black rounded-lg shadow-lg bg-white10"
              onClick={handleOnPlay}
            >
              <Image
                src={"/static/play_arrow.svg"}
                alt="play"
                width="32px"
                height="32px"
              />
              <span className="pl-1 text-lg font-semibold leading-7 text-center text-gray-900">
                Play
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          width: "",
          height: "100%",
          position: "",
        }}
      ></div>
    </div>
  );
};

export default Banner;
