import NavBar from "../../components/nav/navbar";
import Head from "next/head";
import SectionCards from "../../components/card/section-cards";
import redirectUser from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  const videos = await getMyList(userId, token);

  return {
    props: JSON.parse(
      JSON.stringify({
        myListVideos: videos,
      })
    ),
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <>
      <Head>
        <title>My List</title>
      </Head>
      <main>
        <NavBar />
        <div className="mt-28">
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="landscape"
            shouldWrap
          />
        </div>
      </main>
    </>
  );
};

export default MyList;
