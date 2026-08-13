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
    const { product_id, total_amount } = body || {};

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const merchantId = "EPAYTEST";
    const statusUrl = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${merchantId}&total_amount=${total_amount}&transaction_uuid=${product_id}`;

    const response = await fetch(statusUrl);
    const data = await response.json();

    if (data.status === "COMPLETE") {
      return res.status(200).json({ status: "COMPLETED" });
    }

    return res.status(200).json({ status: "FAILED", details: data });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({
      message: "Verification failed",
      error: error.message,
    });
  }
}