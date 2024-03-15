import { Link } from "react-router-dom";

function Notification() {
  return (
    <div className="m-7 border border-borderIcon min-h-[90vh]">
      <div className="max-w-[80%] mx-auto my-0 py-8">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">Notifications</h2>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-[18px] text-center pt-24 pl-2 sm:pl-10 inline-block">
                OOPs You dont have any Notification 🥲. Go back to the feed to
                enjoy more content ☺️
              </span>
              <Link
                className="text-textWhite text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
                to="/blog/feed"
              >
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
