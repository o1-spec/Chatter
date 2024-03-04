import BlogContent from "../BlogPages/BlogContent";
import BlogNav from "../BlogPages/BlogNav";

function Blog() {
  return (
    <div className="font-dmSans">
      <div className="flex">
        <BlogNav />
        <BlogContent />
      </div>
    </div>
  );
}

export default Blog;
