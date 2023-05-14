// import { db } from "../../../firebase.config";
import db from "./index";
export const config = { api: { bodyParser: false } };

const handler = async (req: any, res: any) => {
  let event;
  try {
    // notification

    await db.collection("notifications").doc("random").set(
      {
        // subscription: subscription_data,
        // eth_address
      },
      { merge: true }
    );

    // retrieve the id and email from db-user
    // create subscription if there's no subs
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update subcollection document." });
  }

  // Send a response for all code paths
  return res.status(200).json({ received: true });
};

export default handler;
