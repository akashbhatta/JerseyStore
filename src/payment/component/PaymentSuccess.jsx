import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Decode } from "../utils/helpers";

const PaymentSuccess = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("data");
      const decoded = token ? base64Decode(token) : null;
      const productId = decoded?.transaction_uuid;
      const totalAmount = decoded?.total_amount;

      if (!productId) {
        setStatus("FAILED");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.post("/api/verify-payment", {
          product_id: productId,
          total_amount: totalAmount,
        });

        setStatus(data.status);
      } catch (err) {
        console.error(err);
        setStatus("FAILED");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6">
      {status === "COMPLETED" ? (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>
          <p className="mb-6 text-gray-600">
            Thank you for your order. Your payment has been confirmed.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          <p className="mb-6 text-gray-600">
            Something went wrong. Please try again.
          </p>
        </>
      )}

      <button
        onClick={() => navigate("/home")}
        className="bg-black text-white px-8 py-3 rounded-lg font-semibold"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
