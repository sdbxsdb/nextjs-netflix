import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from "../../components/nav/navbar";
import DislikeIcon from "../../components/icons/dislikeIcon";
import LikeIcon from "../../components/icons/likeIcon";
import { useState, useEffect } from "react";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  // console.log({ context });

  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },

    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["gim2kprjL50", "_2jbO2GlXOo", "numzJtJWT8c"];

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.videoId;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const handleCloseModal = () => {
    router.back();
  };

  const { title, description, channelTitle, viewCount, publishTime } = video;

  useEffect(() => {
    async function fetchVideoData() {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const data = await response.json();

      // console.log({ data });
      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDislike(true);
        }
      }
    }
    fetchVideoData();
  }, []);

  const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favourited = val ? 1 : 0;
    const response = await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDislike;
    setToggleDislike(val);
    setToggleLike(toggleDislike);

    const favourited = val ? 0 : 1;
    const response = await runRatingService(favourited);

    // console.log('data', await response.json());
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center">
        <Modal
          isOpen={true}
          onRequestClose={handleCloseModal}
          contentLabel="Play video"
          overlayClassName={styles.overlay}
          className={styles.modal}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.0 }}
            onClick={handleCloseModal}
            className="absolute top-0 -right-0 cursor-pointer z-200 "
          >
            <Image
              src={"/static/close.svg"}
              alt="close"
              width="30px"
              height="30px"
            />
          </motion.div>
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="360"
            className=""
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&showinfo=0&rel=1`}
            frameBorder="0"
          ></iframe>
          <div className="flex md:flex-row w-full flex-col-reverse px-4 gap-x-4">
            <div className="w-full md:w-2/3">
              <div className=" bg-black10 mt-4 w-full">
                <p className="text-white10 text-2xl pb-4">{title}</p>
              </div>
              <div className="relative">
                <div className="overflow-y-scroll h-[300px]">
                  <p className={styles.description}>{description}</p>
                </div>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black10 h-8"></div>
                <div className="absolute top-0 w-full bg-gradient-to-b  from-black10 h-2"></div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-y-4">
              <div className="flex justify-around mb-4">
                <motion.div
                  onClick={handleToggleLike}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.0 }}
                  className="rounded-full p-2 border-2 border-white20 cursor-pointer "
                >
                  <LikeIcon selected={toggleLike} />
                </motion.div>
                <motion.div
                  onClick={handleToggleDislike}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.0 }}
                  className="rounded-full p-2 border-2 border-white20 cursor-pointer "
                >
                  <DislikeIcon selected={toggleDislike} />
                </motion.div>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <p className="text-gray10 text-xs">Upload Date:</p>
                <p className="text-right">{publishTime}</p>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <p className="text-gray10 text-xs">Channel:</p>
                <p className="text-right">{channelTitle}</p>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <p className="text-gray10 text-xs">View Count:</p>
                <p>{viewCount || "No views yet"}</p>
              </div>
            </div>
          </div>
          {/* <button onClick={handleCloseModal} className='text-white10 absolute top-10 left-10 z-0'>Close</button> */}
        </Modal>
      </div>
    </>
  );
};

export default Video;
