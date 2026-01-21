import React, { useState, useEffect } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../Pages/CartContext";

const SlideShow = ({ jerseys }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { addToCart } = useCart();

  if (!jerseys || jerseys.length === 0) return null;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % jerseys.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, jerseys.length]);

  return (
    <div
      className="relative group w-full min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(jerseys[current]);
          }}
          className="absolute top-1.5 right-1.5 z-10 bg-white/90 p-1 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer"
        >
          <ShoppingCart size={13} />
        </button>

        <img
          src={jerseys[current].imageSrc}
          alt={jerseys[current].name}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />

        {/* ARROWS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent((c) => (c - 1 + jerseys.length) % jerseys.length);
            }}
            className="pointer-events-auto bg-white/80 p-0.5 rounded-full shadow cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent((c) => (c + 1) % jerseys.length);
            }}
            className="pointer-events-auto bg-white/80 p-0.5 rounded-full shadow cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="p-2 text-center">
        <h2 className=" font-bold truncate">
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
