import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen animate-pulse">
      <Image
        src={"/static/netflixLogo.svg"}
        alt="Netflix logo"
        width="300px"
        height="100%"
      />
    </div>
  )
}

export default Loading