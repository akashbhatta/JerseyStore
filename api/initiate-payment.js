import crypto from "crypto";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { amount, productId, productName } = req.body;

    if (!amount || !productId) {
      return res.status(400).json({ message: "Amount and productId are required" });
    }

    const merchantId = process.env.ESEWA_MERCHANT_ID || "EPAYTEST";
    const secret = process.env.ESEWA_SECRET || "8gBm/:&EnhH.1/q";
    const paymentUrl = process.env.ESEWA_PAYMENT_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const successUrl = process.env.SUCCESS_URL || "https://your-project.vercel.app/payment-success";
    const failureUrl = process.env.FAILURE_URL || "https://your-project.vercel.app/payment-failure";

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
}