import jwt from 'jsonwebtoken';
import {findVideoIdByUser} from '../../lib/db/hasura';

export default async function stats(req, res) {
 
    if (req.method === "POST") {
      console.log({ cookies: req.cookies });

      try {
      const token = req.cookies.Token;
      if (!token) {
        res.status(403).send({});
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log({ decoded })

        const userId = 'did:ethr:0x087E2672CC179dC427E2342EA50fbaB2653C19b4';
        const videoId = 'TcMBFSGVi1c';
        const findVideoId = await findVideoIdByUser(token, userId, videoId);
        console.log({findVideoId});
        res.send({ msg: "it works", decoded, findVideoId });
      }
    }
    catch (error) {
      console.error("Error occured / stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  } 
}
