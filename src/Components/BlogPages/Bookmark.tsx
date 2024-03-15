import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Excerpts } from "../utilities/Excerpts";

interface BookmarkBlog {
  id: string;
  imageUrl: string;
  imgUrl: string;
  category: string;
  author: string;
  title: string;
  description: string;
}

interface BookmarkInterface extends Array<BookmarkBlog> {}

function Bookmark() {
  const [bookmark, setBookmark] = useState<BookmarkInterface>([]);
  useEffect(() => {
    const storedBookmarksString = localStorage.getItem("bookmarkedBlogs");
    if (storedBookmarksString) {
      const storedBookmarks: BookmarkInterface = JSON.parse(
        storedBookmarksString
      );
      setBookmark(storedBookmarks);
    }
  }, []);

  console.log(bookmark);
  return (
    <div className="md:m-7 m-3 md:border border-borderIcon h-fit">
      <div className="md:max-w-[80%] mx-auto my-0 py-8 px-3 md:px-0">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Bookmarks</h2>
            <span className="text-[16px] pb-4 sm:pb-0">
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
                <div
                  key={id}
                  className=" shadow-lg px-2 py-4 flex md:flex-row flex-col items-start gap-4 w-full"
                >
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
