import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Decode } from "../utils/helper";
import { useCart } from "../../Pages/CartContext";

const PaymentSuccess = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

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

        if (data.status === "COMPLETED") {
          clearCart(); // Clear cart after successful payment
        }
        setStatus(data.status);
      } catch (err) {
        console.error(err);
        setStatus("FAILED");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [location, clearCart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6 border rounded-lg shadow-lg bg-white">
      {status === "COMPLETED" ? (
        <>
          <div className="mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you for your order. Your payment has been confirmed. You
              will receive an order confirmation email shortly.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/home")}
              className="w-full bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              View Cart
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-6xl mb-4">✕</div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Payment Failed
            </h1>
            <p className="mb-6 text-gray-600">
              Something went wrong while processing your payment. Please try
              again or contact support if the problem persists.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/payment")}
              className="w-full bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Try Payment Again
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Back to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
