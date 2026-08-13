import crypto from "node:crypto";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { amount, productId } = body || {};

    if (!amount || !productId) {
      return res.status(400).json({
        message: "amount and productId are required",
        received: body,
      });
    }

    const merchantId = "EPAYTEST";
    const secret = "8gBm/:&EnhH.1/q";
    const paymentUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const successUrl = "https://jersey-store-six.vercel.app/payment-success";
    const failureUrl = "https://jersey-store-six.vercel.app/payment-failure";

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

    const dataToSign = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;

    const signature = crypto
      .createHmac("sha256", secret)
      .update(dataToSign)
      .digest("base64");

    return res.status(200).json({
      ...paymentData,
      signature,
      payment_url: paymentUrl,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}