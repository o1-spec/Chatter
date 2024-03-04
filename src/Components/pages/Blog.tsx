import BlogHead from "../BlogPages/BlogHead";
import BlogNav from "../BlogPages/BlogNav";
import { Outlet } from "react-router-dom";

function Blog() {
  return (
    <div className="font-dmSans">
      <div className="flex">
        <BlogNav />
        <div className="basis-[83%] pl-[16%]">
          <BlogHead />
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Blog;
