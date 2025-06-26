import React from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import HeroSection from "../components/Hero";
import FeaturedProduct from "./Products/FeaturedProduct";
import About from "../components/About";
import Mission from "../components/Mission";
import Team from "../components/Team";
import FeaturedAboutSection from "../components/FeaturedAboutSection";
import BestSeller from "../components/BestSeller";
import CategoryComponent from "./Products/CategoryComponent";
import NewArrivalProduct from "./Products/NewArrivalProduct";

const Home = () => {
  return (
    <>
      {/* Parallax Background */}
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center opacity-20"
        style={{
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="topo" patternUnits="userSpaceOnUse" width="200" height="200">
            <path d="M100 0C100 55..." fill="none" stroke="lightgray" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>
    `)})`,
  }}
      ></div>

      {/* Hero Section with parallax */}
      <Parallax speed={-20}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <HeroSection />
        </motion.div>
      </Parallax>

      {/* Best Seller */}
      <Parallax speed={10}>
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <BestSeller limit={8} />
        </motion.div>
      </Parallax>

      {/* Categories */}
      <Parallax speed={-10}>
        <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <CategoryComponent limit={4} />
        </motion.div>
      </Parallax>

      {/* Featured Products */}
      <Parallax speed={15}>
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <FeaturedProduct limit={8} />
        </motion.div>
      </Parallax>

      {/* About */}
      <Parallax speed={-5}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
          <About />
        </motion.div>
      </Parallax>

      {/* Highlight Section */}
      <Parallax speed={10}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <FeaturedAboutSection />
        </motion.div>
      </Parallax>

      {/* Mission */}
      <Parallax speed={-8}>
        <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <Mission />
        </motion.div>
      </Parallax>

      {/* Team */}
      <Parallax speed={5}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
          <Team />
        </motion.div>
      </Parallax>

        <Parallax speed={10}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
         <NewArrivalProduct limit={8}/>
        </motion.div>
      </Parallax>
    </>
  );
};

export default Home;
