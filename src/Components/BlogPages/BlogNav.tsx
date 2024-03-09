import { useState } from "react";
import Overview from "../utilities/Overview";
import Personal from "../utilities/Personal";
import Trending from "../utilities/Trending";

function BlogNav({ handleLogout }) {
  const [blue, setBlue] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  return (
    <div className="scroll basis-[17%] border border-r-borderIcon overflow-scroll max-h-screen fixed">
      <div className="py-5 px-6">
        <h2 className="lg:text-2xl text-textBlue uppercase font-bold pb-5">
          Chatter
        </h2>
        <Overview
          blue={blue}
          setBlue={setBlue} 
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Trending
          blue={blue}
          setBlue={setBlue}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Personal
          blue={blue}
          setBlue={setBlue}
          handleLogout={handleLogout}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      </div>
    </div>
  );
}

export default BlogNav;
