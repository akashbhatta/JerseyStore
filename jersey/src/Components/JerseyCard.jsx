import { useCart } from "../Pages/CartContext";

const JerseyCard = ({ id, imageSrc, name, price }) => {
  const { addToCart, setCartOpen } = useCart();

  const handleAdd = () => {
    addToCart({ id, imageSrc, name, price });
    setCartOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200">
      {/* IMAGE */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 md:p-5">
        <h3 className="font-bold text-sm md:text-lg truncate">
          {name}
        </h3>

        <p className="font-bold text-base md:text-xl text-slate-800">
          ${price}
        </p>

        <button
          onClick={handleAdd}
          className="mt-3 w-full py-2 bg-cyan-500 hover:bg-black hover:text-green-500 text-xs md:text-sm font-semibold rounded-lg transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default JerseyCard;
