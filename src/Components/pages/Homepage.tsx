import About from "../utilities/About";
import Hero from "../utilities/Hero";
import Nav from "../utilities/Nav";
import Footer from "../utilities/Footer";
import Why from "../utilities/Why";
import Owner from "../utilities/Owner";
import Creators from "../utilities/Creators";
import { useContext } from "react";

function Homepage({ PostContext }) {
  const { user, setLogin } = useContext(PostContext);
  console.log(user);
  return (
    <div className="font-dmSans">
      <Nav user={user} setLogin={setLogin} />
      <Hero user={user} />
      <About />
      <Why />
      <Owner />
      <Creators />
      <Footer />
    </div>
  );
}

export default Homepage;
