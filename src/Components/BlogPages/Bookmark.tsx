import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Excerpts } from "../utilities/Excerpts";

function Bookmark() {
  const [bookmark, setBookmark] = useState([]);
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedBlogs"));
    if (storedBookmarks) {
      setBookmark(storedBookmarks);
    }
  }, []);

  console.log(bookmark);
  return (
    <div className="m-7 border border-borderIcon h-fit pb-12 pt-6">
      <div className="max-w-[80%] mx-auto my-0 py-8">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Bookmarks</h2>
            <span className="text-[17px]">
              Explore all your bookmarked content
            </span>
          </div>
        </div>
        <div>
          {bookmark.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-[18px] text-center pt-10 pl-10 inline-block">
                You have not bookmarked any blog post yet. Go back to the feed
                to enjoy more content ☺️
              </span>
              <Link
                className="text-textWhite text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
                to="/blog/feed"
              >
                Go back
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8 pt-2">
              {bookmark.map((blog, id) => (
                <div key={id} className=" shadow-lg py-4 flex items-start gap-4 w-full">
                  <img
                    className="w-80 h-52 rounded-md"
                    src={blog?.imageUrl || blog.imgUrl}
                    alt={blog?.title}
                  />
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="text-textWhite w-fit bg-textBlue px-2 py-2 rounded-md">
                      {blog?.category}
                    </span>
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-[18px]">
                        {blog?.author}
                      </p>
                      <p className="text-[15px]"></p>
                    </div>
                    <Link
                      to={`/blog/blogSection/${blog.id}`}
                      className="text-xl font-semibold underline w-fit"
                    >
                      {blog?.title}
                    </Link>
                    <span>{Excerpts(blog?.description, 188)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
