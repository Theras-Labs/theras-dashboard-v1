import { ironOptions } from "./_web3session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import db from "../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        if (fields.nonce !== req.session.nonce)
          return res.status(422).json({ message: "Invalid nonce." });

        req.session.siwe = fields;
        await req.session.save();
        // check has user available in DB

        // const snapshot = await db
        //   .collection("users")
        //   .where("eth_address", "==", fields.address)
        //   .get();
        const doc = await db.collection("users").doc(fields.address).get();
        console.log(doc, "snapshot");

        if (!doc.exists) {
          // make new ones based
          const payload = {
            subscription: null,
            eth_address: fields.address,
            createdAt: Math.floor(Date.now() / 1000),
            email: null,
            name: null,
            image: null,
          };
          await db.collection("users").doc(fields.address).set(payload);

          // // notification for new users
          // await db.collection("notifications").doc(id).set(
          //   {
          //     subscription: subscription_data,
          //     // eth_address
          //   },
          //   { merge: true }
          // );

          res.json({
            ok: true,
            user: payload,
          });
        } else {
          res.json({
            ok: true,
            user: doc.data(),
          });
        }
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
