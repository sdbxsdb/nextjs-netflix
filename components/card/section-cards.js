import React from "react";
import Card from "../card/card";
import Link from "next/link";
import clsx from 'classnames';

const SectionCards = (props) => {
  const { title, videos = [], size, shouldWrap = false} = props;

  return (
    <section className="text-blue20 bg-black50">
      <h2 className="text-white10 font-semibold text-3xl px-12">{title}</h2>
      <div className={clsx('flex pb-12 pt-4 px-12 mr-3 overflow-x-scroll w-full overflow-y-hidden', shouldWrap && 'overflow-x-hidden overflow-y-auto h-full flex-wrap w-full justify-around gap-y-4')}>
        {videos.map((video, index) => {
          // console.log({video})
          return (
            <Link key={index} href={`/video/${video.id}`}>
              <a>
                <Card
                  imgUrl={video.imgUrl}
                  id={index}
                  size={size}
                  title={video.title}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
