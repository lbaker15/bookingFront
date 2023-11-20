import Stripe from 'stripe';
import { ApolloError } from 'apollo-server-express';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const processRefund = async ({ input, pi, si, multipleBooking }) => {
  try {
    if (multipleBooking) {
      const session = await stripe.checkout.sessions.retrieve(si);

      const priceId = await stripe.products.retrieve(session.metadata.product);
      const price = await stripe.prices.retrieve(priceId.default_price);
      const refundAmount = (price.unit_amount / 100) * input.length;
      const refund = await stripe.refunds.create({
        payment_intent: pi,
        amount: refundAmount,
      });
      if (refund.status === 'succeeded') {
        console.log('refunded');
        //Send refund email
      }
      return refund;
    } else {
      const refund = await stripe.refunds.create({
        payment_intent: pi,
      });

      if (refund.status === 'succeeded') {
        console.log('refunded');
        //Send refund email
      }
      return refund;
    }
  } catch (error) {
    throw new ApolloError(error.message, 'REFUND_ERROR', {
      statusCode: 500,
    });
  }
};
