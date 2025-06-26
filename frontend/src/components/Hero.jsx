import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen max-h-[900px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/id/42/1920/1080" // Stylish product arrangement
          alt="Premium products collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 px-3 py-1 text-sm font-semibold text-pink-500 bg-white rounded-full">
              Summer Collection 2023
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Elevate Your Everyday
            </h1>
            <p className="text-xl text-white mb-8 opacity-90">
              Discover handpicked essentials that blend quality, comfort and style
              for your modern lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/shop"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/20"
              >
                Shop Now
              </Link>
              <Link
                to="/new-arrivals"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition duration-300 border border-white/20 backdrop-blur-sm"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;