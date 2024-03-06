import { useContext } from "react";
import BlogHead from "../BlogPages/BlogHead";
import BlogNav from "../BlogPages/BlogNav";
import { Outlet } from "react-router-dom";

function Blog({ PostContext }) {
  const { handleLogout, setActive, user, active, setUser } =
    useContext(PostContext);
  console.log(user);
  return (
    <div className="font-dmSans">
      <div className="flex">
        <BlogNav handleLogout={handleLogout} />
        <div className="basis-[83%] pl-[16%]">
          <BlogHead user={user} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Blog;
