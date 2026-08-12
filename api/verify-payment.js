export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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
}