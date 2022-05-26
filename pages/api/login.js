import { magicAdmin } from '../../lib/magic';

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : null;

      //invoke magic to get did token
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });


      res.send({ done: true });
    } catch (error) {
      res.status(500);
      console.log("Something went wrong login in", error);
      res.send({ done: false });
    }
  } else {
    res.send({ done: false });

  }
}
