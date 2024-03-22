import About from "../utilities/About";
import Hero from "../utilities/Hero";
import Nav from "../utilities/Nav";
import Footer from "../utilities/Footer";
import Why from "../utilities/Why";
import Owner from "../utilities/Owner";
import Creators from "../utilities/Creators";
import { useContext, useEffect } from "react";
import { PostContextValue } from "../../App";
import { useLocation } from "react-router-dom";

interface HomepageProp {
  PostContext: React.Context<PostContextValue>;
}

function Homepage({ PostContext }: HomepageProp) {
  const { user, setLogin } = useContext(PostContext);
  const location = useLocation();

  //console.log(user);

  useEffect(() => {
    if (location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);
  return (
    <div className="font-dmSans">
      <Nav user={user} setLogin={setLogin} />
      <Hero user={user} />
      <div id="about">
        <About />
      </div>
      <Why />
      <Owner user={user} />
      <Creators user={user} />
      <Footer />
    </div>
  );
}

export default Homepage;
