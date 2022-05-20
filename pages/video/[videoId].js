import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import Image from "next/image";
import clsx from "classnames";
import { motion } from "framer-motion";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  const video = {
    title: "video title",
    publishTime: "1990-01-01",
    description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla velit in consectetur porta. Nullam eget orci ipsum. Nulla facilisi. Aliquam sed velit eget justo ornare fermentum a in massa. Nullam quis leo a erat placerat scelerisque vitae id quam. Quisque suscipit leo ipsum, eu porttitor nunc posuere a. Aliquam erat volutpat. Nullam interdum rhoncus pellentesque. Duis ac est fermentum odio consectetur vehicula accumsan a tellus.

    In eu elementum erat. Etiam non posuere est, a sagittis diam. Sed consequat magna libero, ut laoreet ante aliquam quis. Proin velit ligula, tempor at purus eu, tincidunt aliquam est. Pellentesque et tortor sagittis, sodales lacus et, viverra enim. Vivamus vitae facilisis neque, et rutrum ipsum. Morbi et vehicula enim. Duis id quam id massa fermentum consequat. Curabitur dictum condimentum leo ut pharetra. Praesent in nunc scelerisque, ornare leo at, semper mi. Ut suscipit maximus est. Nullam et tristique leo, quis aliquet magna. In hac habitasse platea dictumst. Nulla facilisi. Aliquam suscipit interdum odio non eleifend.
    
    Quisque fringilla elit eget risus rutrum tristique. Nunc ac dignissim purus. Praesent ultricies sapien eleifend odio sollicitudin, sit amet ornare magna vehicula. Praesent tristique ipsum lacus, vel vulputate lacus aliquam nec. Sed ut magna eu sapien aliquam ullamcorper sit amet non justo. Nunc massa velit, convallis non lorem ac, tempor viverra sapien. Nullam convallis, tortor id aliquam mattis, orci quam tincidunt augue, nec consectetur orci nunc vel ex. Quisque feugiat fringilla felis, sit amet vestibulum erat interdum rhoncus. Nullam varius sagittis tincidunt. Suspendisse potenti. Nam sagittis nulla elementum, viverra est non, dignissim sapien. Pellentesque ut massa id nibh condimentum cursus gravida vitae risus. Sed id ex eget orci suscipit dignissim. Vestibulum eget sodales risus, a auctor turpis.'video description lelorem ipsum lorem ipasdf lfdkdksfjllkjsdf'`,
    channelTitle: " channel title",
    viewCount: 10000,
  };

  const { title, description, channelTitle, viewCount, publishTime } = video;

  return (
    <div className="flex items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.0 }}
        onClick={handleCloseModal}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <Image
          src={"/static/close.svg"}
          alt="close"
          width="30px"
          height="30px"
        />
      </motion.div>
      <Modal
        isOpen={true}
        onRequestClose={handleCloseModal}
        contentLabel="Play video"
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          className={styles.videoPlayer}
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&controls=1&showinfo=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className="flex px-4 gap-x-4">
          <div className="w-2/3">
            <div className=" bg-black10 mt-4 w-full">
              <p className="text-red20 text-2xl pb-2">{title}</p>
            </div>
            <div className="relative">
              <div className="overflow-y-scroll max-h-[400px]">
                <p className={styles.description}>{description}</p>
              </div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black10 h-8"></div>
              <div className="absolute top-0 w-full bg-gradient-to-b  from-black10 h-2"></div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-y-4">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-gray10 text-xs">Upload Date:</p>
              <p>{publishTime}</p>
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-gray10 text-xs">Channel:</p>
              <p>{channelTitle}</p>
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-gray10 text-xs">View Count:</p>
              <p>{viewCount}</p>
            </div>
          </div>
        </div>
        {/* <button onClick={handleCloseModal} className='text-white10 absolute top-10 left-10 z-0'>Close</button> */}
      </Modal>
    </div>
  );
};

export default Video;
