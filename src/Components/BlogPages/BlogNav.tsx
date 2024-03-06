import Overview from "../utilities/Overview";
import Personal from "../utilities/Personal";
import Trending from "../utilities/Trending";

function BlogNav({ handleLogout }) {
  return (
    <div className="scroll basis-[17%] border border-r-borderIcon overflow-scroll max-h-screen fixed">
      <div className="py-5 px-6">
        <h2 className="lg:text-2xl text-textBlue uppercase font-bold pb-5">
          Chatter
        </h2>
        <Overview />
        <Trending />
        <Personal handleLogout={handleLogout} />
      </div>
    </div>
  );
}

export default BlogNav;
