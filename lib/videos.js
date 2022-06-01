import { data } from "autoprefixer";
import videoTestData from "../data/videos.json";
import { getWatchedVideos } from "./db/hasura";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY4;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev === "true" ? videoTestData : await fetchVideos(url);
    // console.log({isDev});
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      const snippet = item.snippet;
      


      return {
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet?.description,
        channelTitle: snippet?.channelTitle,
        publishTime: snippet?.publishedAt,
        viewCount: item?.statistics?.viewCount,
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
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

  return getCommonVideos(URL);
};
export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};


//Getting json data from videoId passed into URL and returning data 
const fetchVideoTitle = async (videoId) => {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=youtube.com/watch?v=${videoId}&format=json`
  );
  const data = await response.json();
  // console.log({ data });
  return data;
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);

  const videoArray = [];

  for (const video of videos) {
    const { videoId } = video;
    const videoData = await fetchVideoTitle(videoId);

    videoArray.push({
      id: videoId,
      imgUrl: videoData.thumbnail_url,
      title: videoData.title,
    });
  }

  return videoArray;

  // return videos?.map((video) => {
  //   const { videoId } = video;

  //   const fetchVideoData = async () => {
  //     const response = await fetch(
  //       `https://www.youtube.com/oembed?url=youtube.com/watch?v=${videoId}&format=json`
  //     );
  //     const data = await response.json();
  //     const videoTitle = data.title;
  //     console.log('VideoTitle - ', videoTitle );
  //     return videoTitle;
  //   };
  //   fetchVideoData();

  //   return  {
  //     id: videoId,
  //     imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  //     // title: videoTitle
  //   };

  // });
};
