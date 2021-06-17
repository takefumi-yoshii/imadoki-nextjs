import type { NextApiHandler } from "next";
// ___________________________________________________________________________
//
const handler: NextApiHandler = (req, res) => {
  const body = {
    message: "Hello",
    method: req.method,
  };
  res.statusCode = 200;
  res.json(body);
};

export default handler;
