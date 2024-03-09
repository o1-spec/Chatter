import { useNavigate } from "react-router-dom";
import FeedContent from "../FeedComponent/FeedContent";
 
function Feed() {
  const navigate = useNavigate()

  function post () {
    navigate('/blog/postBlog')
  }
  return (
    <div className="m-7 border border-borderIcon h-fit">
      <div className="max-w-[80%] mx-auto my-0 py-8">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl">Feed</h2>
            <span className="text-[15px]">Explore different content you’d love</span>
          </div>
          <div>
            <button onClick={post} className="flex gap-2 items-center text-textWhite text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300">
              <img className="w-4" src="/Images/write.svg" alt="" />
              <span>Post a Content</span>
            </button>
          </div>
        </div>
        <FeedContent/>
      </div>
    </div>
  );
}

export default Feed;
