import { Link } from "react-router-dom";

function Overview({ blue, setBlue, activeLink, setActiveLink }) {
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
    <div className="pb-7">
      <h5 className="text-[17px] pb-5 text-textBlack font-semibold">
        Overview
      </h5>
      <ul className="flex flex-col gap-3.5 pl-6">
        <li>
          <Link
            className={`flex items-center w-fit gap-3 text-[15px] ${
              activeLink === "feed" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/feed"
            onClick={() => handleLinkClick("feed")}
          >
            <img src="/Images/feed.svg" className="w-3" alt="Feed-img" />
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center w-fit gap-3 text-[15px] ${
              activeLink === "bookmark" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/bookmark"
            onClick={() => handleLinkClick("bookmark")}
          >
            <img
              src="/Images/bookmark.svg"
              className="w-3"
              alt="bookmarks-img"
            />
            <span>Bookmarks</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center w-fit gap-3 text-[15px] ${
              activeLink === "teamBlogs" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/teamBlogs"
            onClick={() => handleLinkClick("teamBlogs")}
          >
            <img
              src="/Images/teamBlogs.svg"
              className="w-3"
              alt="teamBlogs-img"
            />
            <span>Team Blogs</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center w-fit gap-3 text-[15px] ${
              activeLink === "drafts" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/drafts"
            onClick={() => handleLinkClick("drafts")}
          >
            <img src="/Images/drafts.svg" className="w-3" alt="Drafts-img" />
            <span>Drafts</span>
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center w-fit gap-3 text-[15px] ${
              activeLink === "analytics" && blue ? "text-textBlue" : ""
            }`}
            to="/blog/analytics"
            onClick={() => handleLinkClick("analytics")}
          >
            <img
              src="/Images/analytics.svg"
              className="w-3"
              alt="analytics-img"
            />
            <span>Analytics</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Overview;
