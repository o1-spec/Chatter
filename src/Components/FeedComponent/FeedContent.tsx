import FeedBox from "./FeedBox";
import FeedNav from "./FeedNav";
import { useState } from "react";

function FeedContent() {
  const [forYou, setForYou] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [recent, setRecent] = useState(false);

  return (
    <div>
      <FeedNav
        forYou={forYou}
        setForYou={setForYou}
        featured={featured}
        setFeatured={setFeatured}
        recent={recent}
        setRecent={setRecent}
      />
      <FeedBox
        forYou={forYou}
        setForYou={setForYou}
        featured={featured}
        setFeatured={setFeatured}
        recent={recent}
        setRecent={setRecent}
      />
    </div>
  );
}

export default FeedContent;
