import React, { useState, useEffect } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../Pages/CartContext";

const SlideShow = ({ jerseys }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (paused || !jerseys || jerseys.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % jerseys.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, jerseys?.length]);

  if (!jerseys || jerseys.length === 0) return null;

  return (
    <div
      className="relative group w-full min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(jerseys[current]);
          }}
          className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer"
          aria-label={`Add ${jerseys[current].name} to cart`}
        >
          <ShoppingCart size={16} />
        </button>

        <img
          src={jerseys[current].imageSrc}
          alt={jerseys[current].name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {/* ARROWS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent((c) => (c - 1 + jerseys.length) % jerseys.length);
            }}
            className="pointer-events-auto bg-white/90 p-1.5 rounded-full shadow cursor-pointer hover:bg-cyan-500 hover:text-white transition"
            aria-label="Previous jersey"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent((c) => (c + 1) % jerseys.length);
            }}
            className="pointer-events-auto bg-white/90 p-1.5 rounded-full shadow cursor-pointer hover:bg-cyan-500 hover:text-white transition"
            aria-label="Next jersey"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="p-3 text-center">
        <h2 className="text-sm md:text-base font-bold truncate text-slate-900">
          {jerseys[current].name}
        </h2>
        <p className="text-sm font-semibold text-gray-700">
          ${jerseys[current].price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SlideShow;
