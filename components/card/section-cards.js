import React from "react";
import Card from "../card/card";

const SectionCards = (props) => {
  const { title, videos = [], size, } = props;
  console.log({ videos });

  return (
    <section className=" text-blue20 bg-black50">
      <h2 className="text-white10 font-semibold text-3xl px-12">{title}</h2>
      <div className="flex pt-6 pb-6 px-12 mt-6 mr-3 overflow-x-scroll w-full overflow-y-hidden">
        {videos.map((video, index) => {
          return <Card key={index} imgUrl={video.imgUrl} id={index} size={size} title={video.title} />;
        })}
      </div>
    </section>
  );
};

export default SectionCards;
