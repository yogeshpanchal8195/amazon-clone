const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('Insert Stript private key')


app.use(express.json());
app.use(cors({
    origin: true
}))

app.get('/', (req, res) => {
    res.send("Hello Yogesh")
})


app.post('/payments/create', async (req, res) => {
    const totalAmt = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmt,
        currency: "usd",
        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
        },
        payment_method_types: ['card'],
    })

    console.log('Payment proceed',totalAmt)
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app);


// http://localhost:5001/clone-a9872/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



