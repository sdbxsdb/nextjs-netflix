import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos(
    'disney trailer'
  );
  const comedyVideos = await getVideos(
    'comdey movies'
  );
  const codingVideos = await getVideos(
    'coding'
  );
  const popularVideos = await getPopularVideos();
  
  return { props: JSON.parse(JSON.stringify({ disneyVideos, comedyVideos, codingVideos, popularVideos})), };
  };

export default function Home({disneyVideos, comedyVideos, codingVideos, popularVideos}) {

  return (
    <div>
      <Head>
        <title>Netflix | SDB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username="sdbxsdb" />

      <div className="mb-16">
        <Banner
          title="A movie name"
          subtitle="A movie subtitle"
          imgUrl="/static/avengerslandscape.jpg"
        />
      </div>

      <SectionCards title="Disney" videos={disneyVideos} size="portrait" />
      <SectionCards title="Comedy" videos={comedyVideos} size="landscape" />
      <SectionCards title="Learning" videos={codingVideos} size="square" />
      <SectionCards title="Popular" videos={popularVideos} size="landscape" />
      

    </div>
  );
}
