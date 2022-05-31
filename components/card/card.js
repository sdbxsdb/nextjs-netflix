import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";


const Card = (props) => {
  const { imgUrl = "/static/NetflixN.png", size = "square", id, title } = props;

  const classMap = {
    portrait: "w-[218px] relative min-w-[218px] h-[434px] min-h-[434px]",
    square: "w-[158px] relative min-w-[158px] h-[170px] min-h-[170px]",
    landscape: "w-[300px] relative min-w-[300px] h-[170px] min-h-[170px]",
  };

  const [imgSrc, setImgSrc] = useState(imgUrl);
  const handleError = (e) => {
    console.log("IMG ERROR", e);
    setImgSrc("/static/NetflixN.png");
  };

  return (
    <div className="mr-4 cursor-pointer relative">
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.0 }}
        className={cls("relative block hover:z-40 group", classMap[size])}
      >
        <div className='absolute flex items-end z-50 bg-gradient-to-t via-black/[0.3] from-black h-full w-full group-hover:opacity-0 transition-all duration-200 ease-in-out overflow-hidden p-2'>
          <p className='text-white10'>{title}</p>
        </div>
        <Image
          src={imgSrc}
          alt="Picture title"
          layout="fill"
          onError={handleError}
          className="top-0 right-0 bottom-0 left-0 rounded-md object-cover object-center block"
        ></Image>
      </motion.div>
    </div>
  );
};

export default Card;
