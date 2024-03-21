import About from "../utilities/About";
import Hero from "../utilities/Hero";
import Nav from "../utilities/Nav";
import Footer from "../utilities/Footer";
import Why from "../utilities/Why";
import Owner from "../utilities/Owner";
import Creators from "../utilities/Creators";
import { useContext } from "react";
import { PostContextValue } from "../../App";

interface HomepageProp {
  PostContext: React.Context<PostContextValue>;
}

function Homepage({ PostContext }: HomepageProp) {
  const { user, setLogin } = useContext(PostContext);
  //console.log(user);
  return (
    <div className="font-dmSans">
      <Nav user={user} setLogin={setLogin} />
      <Hero user={user} />
      <About />
      <Why />
      <Owner user={user} />
      <Creators user={user} />
      <Footer />
    </div>
  );
}

export default Homepage;
