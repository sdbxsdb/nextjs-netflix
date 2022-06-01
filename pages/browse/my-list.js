import NavBar from "../../components/nav/navbar";
import Head from 'next/head';
import SectionCards from "../../components/card/section-cards";

const  MyList = () => {
  return (
    <>
    <Head>
      <title>My List</title>
    </Head>
    <main>
      <NavBar/>
      <div className="mt-20">
        <SectionCards title='My List' videos={[]} size='landscape'/>
      </div>
    </main>
    </>
  )
}

export default MyList