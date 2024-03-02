import About from "../utilities/About";
import Hero from "../utilities/Hero";
import Nav from "../utilities/Nav";
import Footer from "../utilities/Footer";
import Why from "../utilities/Why";
import Owner from "../utilities/Owner";
import Creators from "../utilities/Creators";

function Homepage() {
  return (
    <div className="font-dmSans">
      <Nav />
      <Hero />
      <About/>
      <Why/>
      <Owner/>
      <Creators/>
      <Footer/>
    </div>
  );
}

export default Homepage;
