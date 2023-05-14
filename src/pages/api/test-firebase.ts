// import { db } from "../../../firebase.config";
import db from "./db";
export const config = { api: { bodyParser: false } };

const handler = async (req: any, res: any) => {
  let event;

  // created 1681254529
  // start 1681254528
  // end 1681254528
  // identify payment type, identify subscription, date today

  //   console.log(invoice_pdf, period_end, period_start);
  const customer_email = "dellryuzi@gmail.com";
  //   console.log(db, "db");
  try {
    // Search for user with matching email
    const snapshot = await db
      .collection("users")
      .where("email", "==", customer_email)
      .get();

    console.log(snapshot, "snapshot");
    if (snapshot.empty) {
      // then it means from landing payment
      // create user here?
      // need experiment
      console.log(`No user found with email ${customer_email}`);
      res
        .status(404)
        .json({ error: `No user found with email ${customer_email}` });
    } else {
      // Return user data
      snapshot.forEach(async (doc) => {
        const data = doc.data();
        const id = doc.id;
        // shouldnt identify as 1st payment since user can skip membership
        const hasSubscribed = !!data?.subscription;
        console.log(id, "USER ID");

        // create current subscription info
        const subscription_data = {
          test: true,
          //   amount: total,
          //   payment_method: "stripe",
          //   currency,
          //   period_start, //same as createdAt
          //   period_end,
          //   data: {
          //     customer_email,
          //     customer_name,
          //     customer,
          //     total,
          //     currency,
          //     hosted_invoice_url,
          //     invoice_pdf,
          //     period_end,
          //     period_start,
          //   },
          last_payment: hasSubscribed ? data?.subscription : null,
        };

        console.log(subscription_data, "subscription_data");

        // // notification
        await db.collection("notifications").doc(id).set(
          {
            subscription: subscription_data,
            // eth_address
          },
          { merge: true }
        );

        res.status(200).json({
          message: "Subscription document updated successfully.",
        });
      });
    }

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
