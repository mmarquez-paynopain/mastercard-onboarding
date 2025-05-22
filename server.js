import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.post("/proxy/payment", async (req, res) => {
  try {
    const paymentParams = {
      signature: process.env.NEXT_PUBLIC_PAYLANDS_SIGNATURE,
      operative: "AUTHORIZATION",
      description: "Mastercard ClickToPay onboarding",
      amount: 0,
      service: process.env.NEXT_PUBLIC_PAYLANDS_SERVICE,
      secure: true,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_PAYLANDS_URL_V1 + "/payment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYLANDS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentParams),
      }
    );

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText} - ${text}`
      );
    }

    const result = JSON.parse(text);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en /proxy/payment:", error.message);
    res
      .status(500)
      .json({ error: "Error en la solicitud de pago", details: error.message });
  }
});

app.post("/proxy/checkout", async (req, res) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_PAYLANDS_URL +
        "/gateway/MASTERCARD/" +
        req.body.token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: req.body.payload,
        }),
      }
    );

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText} - ${text}`
      );
    }

    const result = JSON.parse(text);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en /proxy/checkout:", error.message);
    res
      .status(500)
      .json({ error: "Error en la solicitud de pago", details: error.message });
  }
});

export default app;
