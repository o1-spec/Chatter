import { useNavigate } from "react-router-dom";
import FeedContent from "../FeedComponent/FeedContent";

function Feed() {
  const navigate = useNavigate();

  function post() {
    navigate("/blog/postBlog");
  }
  return (
    <div className="md:m-7 m-3 md:border border-borderIcon h-fit">
      <div className="md:max-w-[80%] mx-auto my-0 py-8 px-3 md:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl">Feed</h2>
            <span className="text-[15px] md:text-[17px] pb-4 sm:pb-0">
              Explore different content you’d love
            </span>
          </div>
          <div>
            <button
              onClick={post}
              className="flex gap-2 items-center text-textWhite translate-x-32 sm:translate-x-0 sm:float-none text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
            >
              <img className="w-4" src="/Images/write.svg" alt="" />
              <span>Post a Content</span>
            </button>
          </div>
        </div>
        <FeedContent />
      </div>
    </div>
  );
}

export default Feed;
