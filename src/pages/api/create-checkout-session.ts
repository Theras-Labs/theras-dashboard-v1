import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./_stripe";
import Cors from "cors";

// const corsOptions = {
//   origin: "*",
//   methods: ["POST"],
//   allowedHeaders: ["Content-Type"],
// };

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const { email, price } = req.body;

  console.log(email, price, "test");
  try {
    const domainURL = process.env.NEXT_PUBLIC_DOMAIN;

    const session = await stripe.checkout.sessions.create({
      // mode: 'payment',
      mode: "subscription",
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      metadata: {
        firebase_id: "",
        member_id: "",
      },

      subscription_data: {
        metadata: {
          member_id: "",
        },
      },
      customer_email: email,
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/checkout/canceled`,
    });

    // return res.redirect(303, session.url);
    return res.json({ url: session.url }); // <-- this is the changed line
  } catch (error) {
    console.log(error, "error server");
    return res.status(500);
  }
}
