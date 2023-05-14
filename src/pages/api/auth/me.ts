import { ironOptions } from "./_web3session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../db";

// load users from here
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        console.log(req.session.siwe?.address, "req.session?.siwe?.addres");
        const doc = await db
          .collection("users")
          .doc(req.session.siwe?.address)
          .get();

        console.log(doc.data(), "DATA? ADA GK ?");
        res.send({ user: doc.data() });
      } catch (error) {
        // tell to siwe 1st -> will ignite users creation
        res.status(404).send({ error: "No User found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
