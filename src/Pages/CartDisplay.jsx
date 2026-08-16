import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

const CartDisplay = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-16">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border bg-white p-4 rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded bg-slate-50"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity || 1}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-orange-700 font-semibold text-sm hover:underline cursor-pointer self-start sm:self-auto"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-bold">
              Total: <span className="text-green-600">NPR {total}</span>
            </p>

            <button
              onClick={() => navigate("/payment")}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDisplay;
