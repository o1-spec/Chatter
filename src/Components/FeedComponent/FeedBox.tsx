import FeedFeatured from "./FeedFeatured";
import ForYou from "./ForYou";
import Recent from "./Recent";

interface feedBox {
  forYou: boolean;
  featured: boolean;
  recent: boolean;
}

function FeedBox({ forYou, featured, recent }: feedBox) {
  return (
    <div className="border border-borderIcon pt-5 rounded-md">
      {forYou && <ForYou />}
      {featured && <FeedFeatured />}
      {recent && <Recent />}
    </div>
  );
}

export default FeedBox;
