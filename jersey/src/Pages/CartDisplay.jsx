import { useCart } from "../Pages/CartContext";

const CartDisplay = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 ">

{cartItems.length === 0 && (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
    <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
    <p className="text-gray-500">Your cart is empty.</p>
  </div>
)}

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageSrc}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-orange-700 font-semibold text-sm hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDisplay;
