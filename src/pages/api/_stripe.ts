export const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  // apiVersion: '2020-08-27',
  apiVersion: "2022-11-15",
  // appInfo: {
  //   // For sample support and debugging, not required for production:
  //   name: 'stripe-samples/accept-a-payment/prebuilt-checkout-page',
  //   version: '0.0.1',
  //   url: 'https://github.com/stripe-samples',
  // },
});
