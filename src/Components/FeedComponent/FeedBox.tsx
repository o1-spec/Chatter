import FeedFeatured from "./FeedFeatured";
import ForYou from "./ForYou";
import Recent from "./Recent";

function FeedBox({ forYou, featured, recent }) {
  return (
    <div className="border border-borderIcon pt-5 rounded-md">
      {forYou && <ForYou />}
      {featured && <FeedFeatured />}
      {recent && <Recent />}
    </div>
  );
}

export default FeedBox;
