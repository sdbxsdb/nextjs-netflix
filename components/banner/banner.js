import React from "react";
import styles from "./banner.module.css";
import Image from 'next/image';

const Banner = (props) => {
  const { title, subtitle, imgUrl } = props;
  const handleOnPlay = () => {
    console.log("play");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h6 className={styles.subtitle}>{subtitle}</h6>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image src={'/static/play_arrow.svg'} alt='play' width='32px' height='32px' />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
        
      </div>
      <div
          className={styles.bannerImg}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        ></div>
    </div>
  );
};

export default Banner;
