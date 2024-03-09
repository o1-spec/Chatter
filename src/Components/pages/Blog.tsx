import { useContext } from "react";
import BlogHead from "../BlogPages/BlogHead";
import BlogNav from "../BlogPages/BlogNav";
import { Outlet } from "react-router-dom";

function Blog({ PostContext }) {
  const { handleLogout, setActive, user, active, setUser } =
    useContext(PostContext);

  return (
    <div className="font-dmSans w-full h-full">
      <div className="flex h-full">
        <BlogNav handleLogout={handleLogout} />
        <div className="w-[100vw] pl-[16%] overflow-scroll scroll">
          <BlogHead user={user} />
          <div className="h-screen overflow-scroll scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
