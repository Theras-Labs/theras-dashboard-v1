// import { db } from "../../../firebase.config";
import db from "./db";
import { stripe } from "./_stripe";
// export const config = { api: { bodyParser: false } };

const handler = async (req: any, res: any) => {
  let event;
  console.log(
    process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET,
    "NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET"
  );

  // if (process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET) {
  //   // Retrieve the event by verifying the signature using the raw body and secret.
  //   let signature = req.headers["stripe-signature"];

  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       req.rawBody,
  //       signature,
  //       process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
  //     );
  //     console.log(event, "event");
  //   } catch (err) {
  //     console.log(`⚠️  Webhook signature verification failed.`);
  //     return res.status(400);
  //   }
  // } else {
  // Webhook signing is recommended, but if the secret is not configured in `.env`,
  // retrieve the event data directly from the request body.
  event = req.body;
  // }

  // Handle the event
  switch (event.type) {
    // case "payment_intent.succeeded":
    //   const paymentIntent = event.data.object;
    //   console.log("PaymentIntent was successful!");
    //   break;
    case "invoice.payment_succeeded":
      const {
        customer_email,
        customer_name,
        customer,
        total,
        currency,
        hosted_invoice_url,
        invoice_pdf,

        // period_end, period_start they're not the subscription period at all.
        // period_end,
        period_start,
      } = event.data.object;

      // created 1681254529
      // start 1681254528
      // end   1681254528
      // identify payment type, identify subscription, date today

      try {
        // Search for user with matching email
        const snapshot = await db
          .collection("users")
          .where("email", "==", customer_email)
          .get();

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

            const TIER_TITLE = ["silver", "gold", "diamond"];
            const TIER_AMOUNT = [4900, 24900, 188900];
            // getTierList()
            // create current subscription info
            const subscription_data = {
              tier: TIER_TITLE[TIER_AMOUNT.indexOf(Number(total))],
              amount: total,
              payment_method: "stripe",
              currency,
              createdAt: period_start, //same as createdAt
              expiredAt: period_start + 2592000,
              data: {
                customer_email,
                customer_name,
                customer,
                total,
                currency,
                hosted_invoice_url,
                invoice_pdf,
                createdAt: period_start, //same as createdAt
                expiredAt: period_start + 2592000,
              },
              last_payment: hasSubscribed ? data?.subscription : null,
            };

            // console.log(subscription_data, "subscription_data");

            // Update subcollection document
            await db.collection("users").doc(id).set(
              {
                subscription: subscription_data,
                // eth_address
              },
              { merge: true }
            );

            // update or create the subscription - maybe add the logs too (detect and read1st?)
            // check exist or not else use array union
            // docRef.update({
            //     favorites: firebase.firestore.FieldValue.arrayUnion(newItem)
            //   })
            await db
              .collection("subscriptions")
              .doc(id)
              .set(
                {
                  // subscription: subscription_data
                  // eth_address
                  ...subscription_data,
                  // logs:
                },
                { merge: true }
              );

            // notification
            await db.collection("notifications").add({
              userId: id,
              message:
                "You just succesfully purchased " +
                TIER_TITLE[TIER_AMOUNT.indexOf(Number(total))] +
                " package",
              read: false,
              // readAt
              // removedAt
            });

            res.status(200).json({
              message: "Subscription document updated successfully.",
            });
          });
        }

        res.status(200).json({ error: "Unhandled event type." });

        // retrieve the id and email from db-user
        // create subscription if there's no subs
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "Failed to update subcollection document." });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(200).json({ error: "Unhandled event type." });
  }

  // Send a response for all code paths
  console.log("last response?");
  return res.status(200).json({ received: true });
};

export default handler;
