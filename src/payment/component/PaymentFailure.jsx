import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="mb-6 text-gray-600">
        Your payment could not be processed. Please try again.
      </p>
      <button
        onClick={() => navigate("/cart")}
        className="bg-black text-white px-8 py-3 rounded-lg font-semibold"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default PaymentFailure;
