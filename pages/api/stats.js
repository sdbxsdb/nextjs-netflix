import jwt from 'jsonwebtoken';
import {findVideoIdByUser, updateStats} from '../../lib/db/hasura';

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
            favourited: 1, 
            userId,
            watched: true,
            videoId: 'TcMBFSGVi1c'
          });
          res.send({ msg: "it works", updateStats: response });
        } 
        else {
          // add it 
          res.send({ msg: "it doesn't", decodedToken, findVideoId: doesStatsExist });

        } 
      }
    }
    catch (error) {
      console.error("Error occured / stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  } 
}
