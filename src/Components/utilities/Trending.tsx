import { Link } from "react-router-dom";

function Trending({ blue, setBlue, activeLink, setActiveLink }) {
  const handleLinkClick = (linkName) => {
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
            onClick={() => handleLinkClick("programming")}
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
            onClick={() => handleLinkClick("dataScience")}
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
            onClick={() => handleLinkClick("technology")}
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
            onClick={() => handleLinkClick("machineLearning")}
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
            onClick={() => handleLinkClick("politics")}
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
            onClick={() => handleLinkClick("all")}
          >
            See all
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Trending;
