const env=require('dotenv').config();
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51RBMXo4FlSbelSuKp15qkCFl65CTopoEuNZcQ5pIjYp0rJjoHazQIQkaunaimiOvL6enfref6slxKJRmfvx11w1q003oe4GUPp"); 
module.exports = stripe;
