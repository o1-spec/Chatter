import { Link } from "react-router-dom";

function Overview() {
  return (
    <div className="pb-7">
      <h5 className="text-[17px] pb-5 text-textBlack font-semibold">
        Overview
      </h5>
      <ul className="flex flex-col gap-3.5 pl-6">
        <li>
          <Link className="flex items-center w-fit gap-3 text-[15px]" to="/feed">
            <img src="/Images/feed.svg" className="w-3" alt="Feed-img" />
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/bookmark" className="flex items-center w-fit gap-3 text-[15px]">
            <img src="/Images/bookmark.svg" alt="Bookmark" />
            <span>Bookmxarks</span>
          </Link>
        </li>
        <li>
          <Link to="/teamBlogs" className="flex items-center w-fit gap-3 text-[15px]">
            <img src="/Images/teamBlogs.svg" alt="Team Blogs" />
            <span>Team Blogs</span>
          </Link>
        </li>
        <li>
          <Link to="/drafts" className="flex items-center w-fit gap-3 text-[15px]">
            <img src="/Images/drafts.svg" alt="Drafts" />
            <span>Drafts</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="flex items-center w-fit gap-3 text-[15px]">
            <img src="/Images/analytics.svg" alt="Analytics" />
            <span>Analytics</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Overview;
