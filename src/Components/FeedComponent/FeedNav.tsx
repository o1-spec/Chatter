interface feedNav {
  setForYou: (value: boolean) => void;
  setFeatured: (value: boolean) => void;
  setRecent: (value: boolean) => void;
  forYou: boolean;
  recent: boolean;
  featured: boolean;
}

function FeedNav({
  setForYou,
  setFeatured,
  setRecent,
  forYou,
  featured,
  recent,
}: feedNav) {
  const handleforYou = () => {
    setForYou(true);
    setFeatured(false);
    setRecent(false);
  };

  const handleFeatured = () => {
    setForYou(false);
    setFeatured(true);
    setRecent(false);
  };

  const handleRecent = () => {
    setForYou(false);
    setFeatured(false);
    setRecent(true);
  };
  return (
    <div className="border border-borderIcon px-6 pt-5 rounded-md">
      <ul className="flex justify-between items-center">
        <li className="relative flex flex-col">
          <span
            className="sm:text-xl text-lg font-semibold pb-3 cursor-pointer"
            onClick={handleforYou}
          >
            For you
          </span>
          {forYou && (
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
          )}
        </li>
        <li className="relative flex flex-col">
          <span
            className="sm:text-xl text-lg font-semibold pb-3 cursor-pointer"
            onClick={handleFeatured}
          >
            Featured
          </span>
          {featured && (
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
          )}
        </li>
        <li className="relative flex flex-col">
          <span
            className="sm:text-xl text-lg font-semibold pb-3 cursor-pointer"
            onClick={handleRecent}
          >
            Recent
          </span>
          {recent && (
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
          )}
        </li>
      </ul>
    </div>
  );
}

export default FeedNav;
