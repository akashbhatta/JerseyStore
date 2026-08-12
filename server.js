// This is a simple Node.js server to handle payment API routes locally
// For production, use Vercel serverless functions (the files in /api folder)

import express from "express";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initiate Payment Endpoint
app.post("/api/initiate-payment", async (req, res) => {
  try {
    const { amount, productId, productName } = req.body;

    if (!amount || !productId) {
      return res.status(400).json({ message: "Amount and productId are required" });
    }

    const merchantId = process.env.ESEWA_MERCHANT_ID || "EPAYTEST";
    const secret = process.env.ESEWA_SECRET || "8gBm/:&EnhH.1/q";
    const paymentUrl = process.env.ESEWA_PAYMENT_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const successUrl = process.env.SUCCESS_URL || "http://localhost:5173/payment-success";
    const failureUrl = process.env.FAILURE_URL || "http://localhost:5173/payment-failure";

    // Prepare payment data
    const paymentData = {
      amount: String(amount),
      tax_amount: "0",
      total_amount: String(amount),
      transaction_uuid: productId,
      product_code: merchantId,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    // Generate signature
    const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
    const signature = crypto
      .createHmac("sha256", secret)
      .update(data)
      .digest("base64");

    // Return data to frontend
    return res.status(200).json({
      ...paymentData,
      signature,
      payment_url: paymentUrl,
    });
  } catch (error) {
    console.error("Initiate payment error:", error);
    return res.status(500).json({ message: "Failed to initiate payment" });
  }
});

// Verify Payment Endpoint
app.post("/api/verify-payment", async (req, res) => {
  try {
    const { product_id, total_amount } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const merchantId = process.env.ESEWA_MERCHANT_ID || "EPAYTEST";
    const statusUrl = process.env.ESEWA_STATUS_URL || "https://rc.esewa.com.np/api/epay/transaction/status/";

    // Check payment status with eSewa
    const url = `${statusUrl}?product_code=${merchantId}&total_amount=${total_amount}&transaction_uuid=${product_id}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "COMPLETE") {
      return res.status(200).json({ status: "COMPLETED" });
    } else {
      return res.status(200).json({ status: "FAILED" });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ message: "Verification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});
