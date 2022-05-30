import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";

export default async function stats(req, res) {
  try {
    const token = req.cookies.Token;

    if (!token) {
      res.status(403).send({});
    } else {
      const inputParams = req.method === 'POST' ? req.body : req.query
      const { videoId } = inputParams;
      

      if (videoId) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;
        const findVideo = await findVideoIdByUser(token, userId, videoId);

        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;

          if (doesStatsExist) {
            //update it
            const response = await updateStats(token, {
              favourited,
              userId,
              watched,
              videoId,
            });
            res.send({ data: response });
          } else {
            // add it
            const response = await insertStats(token, {
              favourited,
              userId,
              watched,
              videoId,
            });
            res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo);
          } else {
            res.status(404);
            res.send({ user: null, msg: "Video not found" });
          }
        }
      } else {
        res.status(400);
        res.send({ user: null, msg: "VideoId not provided" });
      }
    }
  } catch (error) {
    console.error("Error occured / stats", error);
    res.status(500).send({ done: false, error: error?.message });
  }
}
