import { useState, useEffect } from "react";
import Home from "./Home"; 
import DeJong from "../photos/DeJong.jpg";
import colePalmer from "../photos/colePalmer.jpg";
import celeb from "../photos/celeb.jpg";
import raphiniaCeleb from "../photos/raphiniaCeleb.jpg";
import bg from "../photos/bg.jpg";


const heroImages = [DeJong, colePalmer, celeb, raphiniaCeleb, bg];

export default function Homepage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % heroImages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* HERO SECTION - 85% Height */}
      <div className="flex flex-col md:flex-row h-[85vh] overflow-hidden bg-gray-200">
        
        {/* IMAGE SLIDER WITH ANIMATION */}
        <div className="order-1 md:order-2 md:w-[70%] w-full flex relative h-[65%] md:h-full">
          <div className="relative w-full h-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0_88%)] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">
            {heroImages.map((img, i) => {
              // Sliding Animation Logic
              let position = "translate-x-full opacity-0"; // Default: hidden to the right
              if (i === index) {
                position = "translate-x-0 opacity-100 z-20"; // Current image
              } else if (i === (index - 1 + heroImages.length) % heroImages.length) {
                position = "-translate-x-full opacity-0 z-10"; // Previous image moves left
              }

              return (
                <img 
                  key={i} 
                  src={img} 
                  alt="Hero" 
                  className={`
                    absolute inset-0 h-full w-full object-cover 
                    transition-all duration-[1200ms] 
                    ease-[cubic-bezier(0.1,0.2,0.1,0.5)]
                    ${position}
                  `} 
                />
              );
            })}
          </div>
        </div>

        {/* SHOP NOW CONTENT */}
<div className="order-2 md:order-1 md:w-[30%] w-full flex flex-col justify-center items-center md:items-start px-8 md:px-16 -mt-10 md:mt-0 relative z-30">

  {/* Animated Gear Up */}
  <h1 className="text-4xl md:text-6xl font-black mb-2 italic flex gap-0 overflow-hidden">
  {"GEAR UP".split("").map((letter, idx) => (
    <span
      key={idx}
      className="inline-block animate-bounceLetter"
      style={{ 
        /* The delay creates the 'one after another' wave effect */
        animationDelay: `${idx * 0.1}s` 
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ))}
</h1>

  <p className="text-lg md:text-xl mb-6 text-gray-600">Premium Quality Kits</p>

  {/* Animated Button */}
  <button
  onClick={() =>
    document.getElementById("home-section").scrollIntoView({ behavior: "smooth" })
  }
  className="relative px-10 py-4 font-bold uppercase tracking-widest bg-cyan-600 text-white 
             overflow-hidden group rounded-md"
>
  <span className="relative z-10">Shop Now</span>

  {/* Arrow border animation */}
  <span className="absolute inset-0 pointer-events-none border-arrow-container">
    <span className="border-arrow-moving"></span>
  </span>
</button>
</div>

      </div>

      {/* TRANSITION SECTION - 15% Height */}
      <section id="home-section" className="py-1 px-6 bg-gray-200" >

        <h1 className="py-0 text-3xl md:text-4xl font-bold text-center mb-4">

          Available Jerseys

        </h1>

        {/* Jersey cards go here */}

      </section>

      {/* JERSEY GRID SECTION */}
      <Home /> 
    </div>
  );
}