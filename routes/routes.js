import express from 'express';
const router = express.Router();
import controller from '../controllers/stripe.js';
import auth from '../controllers/auth.js';

//Stripe payment
router.post('/checkout', controller.checkout);
//Handle logins
router.post('/signout', auth.signout);
router.post('/signin', auth.signin);
router.get('/test', (req, res) => {
  res.send('test');
});

export default router;
