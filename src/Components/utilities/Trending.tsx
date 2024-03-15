import { Link } from "react-router-dom";

interface TrendingProps {
  blue: boolean;
  setBlue: (value: boolean) => void;
  activeLink: string | null;
  setBlogNav: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  setActiveLink: (value: string | null) => void;
}

function Trending({
  blue,
  setBlue,
  activeLink,
  setBlogNav,
  setSearchOpen,
  setActiveLink,
}: TrendingProps) {
  const handleLinkClick = (linkName: string) => {
    if (activeLink === linkName) {
      setActiveLink(null);
      setBlue(false);
    } else {
      setActiveLink(linkName);
      setBlue(true);
    }
  };

  return (
    <div className="pb-6">
      <h5 className="text-[17px] pb-5 text-textBlack font-semibold">
        Trending Tags
      </h5>
      <ul className="flex flex-col gap-3.5 pl-6">
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "programming" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/programming"
            onClick={() => {
              setBlogNav(false);
              handleLinkClick("programming");
              setSearchOpen(false);
            }}
          >
            Programing
          </Link>
        </li>
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "dataScience" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/dataScience"
            onClick={() => {
              setSearchOpen(false);
              setBlogNav(false);
              handleLinkClick("dataScience");
            }}
          >
            Data Science
          </Link>
        </li>
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "technology" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/technology"
            onClick={() => {
              setBlogNav(false);
              setSearchOpen(false);
              handleLinkClick("technology");
            }}
          >
            Technology
          </Link>
        </li>
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "machineLearning" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/machineLearning"
            onClick={() => {
              setBlogNav(false);
              setSearchOpen(false);
              handleLinkClick("machineLearning");
            }}
          >
            Machine Learning
          </Link>
        </li>
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "politics" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/politics"
            onClick={() => {
              setBlogNav(false);
              handleLinkClick("politics");
              setSearchOpen(false);
            }}
          >
            Politics
          </Link>
        </li>
        <li>
          <Link
            className={`text-[15px] ${
              activeLink === "all" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/all"
            onClick={() => {
              setSearchOpen(false);
              setBlogNav(false);
              handleLinkClick("all");
            }}
          >
            See all
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Trending;
