import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.Token;
      
      if (!token) {
        res.status(403).send({});
      } else {
        const { videoId, favourited, watched = true } = req.body;
        
        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decodedToken.issuer;
          const doesStatsExist = await findVideoIdByUser(
            token,
            userId,
            videoId
          );

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
        }
      }
    } catch (error) {
      console.error("Error occured / stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
}
