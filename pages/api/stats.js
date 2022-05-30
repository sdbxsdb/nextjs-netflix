import jwt from 'jsonwebtoken';
import {findVideoIdByUser, insertStats, updateStats} from '../../lib/db/hasura';

export default async function stats(req, res) {
 
    if (req.method === "POST") {

      try {
      const token = req.cookies.Token;
      if (!token) {
        res.status(403).send({});
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.issuer;
        const doesStatsExist = await findVideoIdByUser(token, userId, videoId);
        if (doesStatsExist) {
          //update it 
          const response = await updateStats(token, {
            favourited: 0, 
            userId,
            watched: true,
            videoId
          });
          res.send({ msg: "it works", response });
        } 
        else {
          // add it 
          const response = await insertStats(token, {
            favourited: 0, 
            userId,
            watched: false,
            videoId: '_rV1rbRxdrg'
          });
          res.send({ msg: "it works", response });

        } 
      }
    }
    catch (error) {
      console.error("Error occured / stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  } 
}