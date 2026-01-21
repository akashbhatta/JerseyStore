import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

export default function ClubDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const team = location.state?.team;
  const { addToCart, setCartOpen  } = useCart();

  // Scroll to top when entering this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!team) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">No Team Data Found</h2>
        <button onClick={() => navigate("/")} className="bg-black text-white px-6 py-2 rounded">
          Back to Shop
        </button>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / Back button */}
        <button onClick={() => navigate(-1)} className="mb-6 text-black hover:underline flex items-center cursor-pointer">
          ← Back to Jerseys
        </button>
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-10 border border-gray-100">
          <h1 className="text-4xl font-black mb-6 text-center">{team.teamName}</h1>
          <div className="h-1 w-20 bg-gray-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold">
            {team.description || "No description available for this team."}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-8">Shop the Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.jerseys.map((jersey) => (
            <div key={jersey.id} className="bg-gray-200 p-4 rounded-xl shadow-md group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src={jersey.imageSrc} alt={jersey.name} className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h2 className="font-bold text-lg">{jersey.name}</h2>
              <p className="text-gray-700 text-xl font-bold">${jersey.price}</p>
              <button onClick={()=> {
                addToCart(jersey);
                setCartOpen(true);
              }}
                  className="w-full mt-4 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors cursor-pointer font-semibold">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}