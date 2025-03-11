import React from "react";
import Navbar from "./navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Sliders from "./Sliders";
import Footer from "./Footer";
import HomeProducts from "./Products";

function Home() {
  return (
    <div>
      <Navbar />
      <Sliders />
      <HomeProducts />
      <Footer />
    </div>
  );
}

// Ad to card sotib olishdan oldin
// by now sotib olish
// like doimgiday like

export default Home;
