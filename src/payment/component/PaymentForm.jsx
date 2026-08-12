import { useState } from "react";
import { useCart } from "../../Pages/CartContext";
import { generateUniqueId } from "../utils/helper";
import axios from "axios";

const PaymentForm = () => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0,
  );

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const productId = generateUniqueId();

      const { data } = await axios.post("/api/initiate-payment", {
        amount: totalAmount,
        productId,
        productName: `Jersey Order (${cartItems.length} items)`,
      });

      // Create and auto-submit form to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payment_url;

      Object.entries(data).forEach(([key, value]) => {
        if (key === "payment_url") return;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      alert("Failed to start payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

      <div className="mb-6 space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity || 1}
            </span>
            <span>NPR {item.price * (item.quantity || 1)}</span>
          </div>
        ))}

        <div className="border-t pt-3 font-bold flex justify-between text-lg">
          <span>Total</span>
          <span className="text-green-600">NPR {totalAmount}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || cartItems.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
      >
        {loading ? "Redirecting to eSewa..." : "Pay with eSewa"}
      </button>
    </div>
  );
};

export default PaymentForm;
