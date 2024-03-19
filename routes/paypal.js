const express = require("express");
const app = express.Router();

const paypal = require("@paypal/checkout-server-sdk");

let clientId = process.env.PAYPALCLIENTID;
let clientSecret = process.env.PAYPALCLIENTSECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);


// CREAR PAGO DESDE SITIO WEB
app.post("/process_payment", async (req, res) => {

  const { total } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "MXN",
          value: total,
        },
      },
    ],
  });

  const response = await client.execute(request);

  res.json({ id: response.result.id });
  
});




module.exports = app;








