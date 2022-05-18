export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY2;

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    // console.log({ data });

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item?.snippet?.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        id,
      };
    });
  } catch (error) {
    console.log("Some thing went wrong with video fetching", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=5&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  //  
  const URL = 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'
  return getCommonVideos(URL)

}
