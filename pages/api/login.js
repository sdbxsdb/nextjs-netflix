export default async function login(req, res) {
  if (req.method === "POST") {
    try {
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
