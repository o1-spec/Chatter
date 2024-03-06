import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Logout({ PostContext }) {
  const { handleLogout } = useContext(PostContext);
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="bg-textRed w-[50vw] mx-auto translate-x-14 my-0 mt-16 rounded-lg px-3 py-24 shadow-2xl">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-3xl text-textBlack font-semibold">
            Are you sure you want to logout
          </p>
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => {
                handleLogout();
                navigate("/login");
              }}
              className="text-textWhite text-[15px] bg-textBlue px-12 py-2 rounded-lg transition"
            >
              Yes
            </button>
            <Link
              className="text-textWhite text-[15px] bg-textBlack px-12 py-2 rounded-lg transition"
              to="/blog/feed"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
