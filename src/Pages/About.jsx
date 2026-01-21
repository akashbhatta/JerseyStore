import { useEffect, useState } from "react";
import image1 from "../photos/ArdaGuler.jpg";
import image2 from "../photos/messi.jpg";
import image3 from "../photos/lewandowski.jpg";
import image4 from "../photos/enzo.jpg";
import image5 from "../photos/rapha.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
];

export default function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-300 text-gray-900 py-25">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold text-black mb-6">
            About <span className="text-red-500">JerseyStore</span>
          </h2>

          <p className="text-gray-900 leading-relaxed mb-4">
            JerseyStore was created for football fans who want simple access to
            quality jerseys without overcomplication. We focus on popular club
            and national team jerseys that fans actually wear — whether it’s
            for match day, casual outings, or collection purposes.
          </p>

          <p className="text-gray-900 leading-relaxed mb-4">
            Our goal is not to exaggerate, but to provide well-made jerseys with
            clean stitching, accurate designs, and comfortable fabric at a fair
            price. Each product is selected with attention to detail so fans can
            confidently represent their team.
          </p>

          <p className="text-gray-900 leading-relaxed mb-6">
            From classic kits to current season releases, JerseyStore continues
            to grow alongside the football community that inspires it.
          </p>

          <div className="flex gap-8">
            <div>
              <h4 className="text-2xl font-semibold text-black">Carefully</h4>
              <p className="text-sm text-gray-900">Selected Jerseys</p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-black">Football</h4>
              <p className="text-sm text-gray-900">Focused Store</p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-black">Secure</h4>
              <p className="text-sm text-gray-900">Shopping Experience</p>
            </div>
          </div>
        </div>

        {/* Right Slideshow */}
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Football players"
              className={`absolute inset-0 w-full h-full 
              object-cover object-top
              transition-all duration-1000 ease-in-out
              ${
                i === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-6 left-6"> </div>
        </div>
      </div>
    </section>
  );
}
