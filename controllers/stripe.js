import Stripe from 'stripe';
import { sendEmail } from '../util/email.js';

const checkout = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);

    const { id, title, value, email, price } = req.body;

    if (!price) {
      const err = new Error('Missing price');
      err.status = 400;
      throw err;
    }

    const product = await stripe.products.search({
      query: `name:"${price}"`,
    });

    if (!product || product.data.length === 0) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }

    const pricing = product.data[0].default_price;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        product: product.data[0].id,
        productPrice: pricing,
      },
      line_items: [
        {
          price: pricing,
          quantity: value,
        },
      ],
      mode: 'payment',
      success_url: `https://localhost:3000/success/${id}?title=${title}&count=${value}&eventId=${id}`,
      cancel_url: `http://localhost:3000/cancel`,
      customer_email: email,
    });
    // res.cookie('httpOnlySession', session.id, {
    //   httpOnly: true,
    //   secure: true, // Set to 'true' if using HTTPS
    //   sameSite: 'lax', // Adjust the value according to your needs
    //   maxAge: 3600 * 1000, // Set the expiration time in milliseconds
    //   path: '/', // Set the path for which the cookie is valid
    // });
    res.json({ url: session.url, id: session.id });
  } catch (error) {
    next(error);
  }
};
//Deprecated
const session = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);

    const { session } = req.body;
    const r = await stripe.checkout.sessions.retrieve(session);

    if (r.payment_status !== 'paid') {
      const err = new Error('Error processing payment');
      err.status = 404;
      throw err;
    }
    sendEmail(r);
    res.json({ result: r });
  } catch (error) {
    next(error);
  }
};

export default { checkout, session };
