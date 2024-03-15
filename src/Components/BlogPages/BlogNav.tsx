import { useState } from "react";
import Overview from "../utilities/Overview";
import Personal from "../utilities/Personal";
import Trending from "../utilities/Trending";

interface BlogProps {
  blogNav: boolean;
  setBlogNav: (blognav: boolean) => void;
  setSearchOpen: (blognav: boolean) => void;
}

function BlogNav({ blogNav, setBlogNav, setSearchOpen }: BlogProps) {
  const [blue, setBlue] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  return (
    <div
      className={
        !blogNav
          ? "scroll basis-[17%] transition-all duration-300 border bg-textWhite z-30 border-r-borderIcon overflow-scroll md:translate-x-0 -translate-x-[100%] max-h-screen fixed"
          : "scroll basis-[17%] border transition-all duration-300 bg-textWhite z-30 border-r-borderIcon overflow-scroll translate-x-[0] max-h-screen fixed"
      }
    >
      <div className="py-5 px-6">
        <h2 className="lg:text-2xl text-textBlue uppercase font-bold pb-5">
          Chatter
        </h2>
        <Overview
          blue={blue}
          setBlue={setBlue}
          activeLink={activeLink}
          setSearchOpen={setSearchOpen}
          setActiveLink={setActiveLink}
          setBlogNav={setBlogNav}
        />
        <Trending
          blue={blue}
          setBlue={setBlue}
          setSearchOpen={setSearchOpen}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          setBlogNav={setBlogNav}
        />
        <Personal
          blue={blue}
          setBlue={setBlue}
          setSearchOpen={setSearchOpen}
          setBlogNav={setBlogNav}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      </div>
    </div>
  );
}

export default BlogNav;
