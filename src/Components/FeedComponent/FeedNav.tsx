function FeedNav() {
  return (
    <div className="border border-borderIcon px-6 pt-5 rounded-md">
      <ul className="flex justify-between items-center">
        <li className="relative flex flex-col">
          <span className="text-xl font-semibold pb-3">For you</span>
          <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
        </li>
        <li className="relative flex flex-col">
          <span className="text-xl font-semibold pb-3">Featured</span>
        </li>
        <li className="relative flex flex-col">
          <span className="text-xl font-semibold pb-3">Recent</span>
        </li>
      </ul>
    </div>
  );
}

export default FeedNav;
