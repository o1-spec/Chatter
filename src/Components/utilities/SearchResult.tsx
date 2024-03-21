import { Link, useNavigate } from "react-router-dom";
import { Excerpts } from "./Excerpts";
import { TrendingInterface } from "../BlogPages/Trending/TrendingInterface";

interface SearchResultProp {
  filteredBlog: TrendingInterface[];
  setSearchOpen: (searchOpen: boolean) => void;
}

function SearchResult({ filteredBlog, setSearchOpen }: SearchResultProp) {
  const navigate = useNavigate();
  console.log(filteredBlog);
  return (
    <div>
      <div className="md:m-7 m-3 md:border border-borderIcon h-fit">
        <div className="md:max-w-[80%] mx-auto my-0 py-8 px-3 md:px-0 min-h-screen">
          <div className="flex justify-between items-center pb-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold">Search Results</h2>
              <span className="text-[16px] pb-4 sm:pb-0">Results....</span>
            </div>
          </div>
          <>
            {!filteredBlog ? (
              <p className="text-center text-xl  py-6">
                None exist Please check the input
              </p>
            ) : (
              filteredBlog.map((blog) => (
                <div
                  key={blog.id}
                  className="px-2 py-4 flex md:flex-row flex-col items-start gap-4 w-full"
                >
                  <img
                    className="w-80 h-52 rounded-md"
                    src={blog.imageUrl || blog.imgUrl}
                    alt={blog.title}
                  />
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="text-textWhite w-fit bg-textBlue px-2 py-2 rounded-md">
                      {blog.category}
                    </span>
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-[18px]">{blog.author}</p>
                      <p className="text-[15px]"></p>
                    </div>
                    <Link
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/blog/blogSection/${blog?.id}`);
                        setSearchOpen(false);
                      }}
                      className="text-xl font-semibold underline w-fit"
                    >
                      {blog.title}
                    </Link>
                    <span>{Excerpts(blog.description, 188)}</span>
                  </div>
                </div>
              ))
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
