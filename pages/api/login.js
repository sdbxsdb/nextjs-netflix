import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser } from "../../lib/db/hasura";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : null;

      //invoke magic to get did token
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      //create JWT token
      const token = jwt.sign({
        ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user", 
            "x-hasura-user-id": `${metadata.issuer}`,
        },
      }, process.env.JWT_SECRET);

      //CHECK IF USER EXISITS
      const isNewUserQuery = await isNewUser(token, metadata.issuer);

      res.send({ done: true, isNewUserQuery });
    } catch (error) {
      res.status(500);
      console.log("Something went wrong login in", error);
      res.send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
