import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostContextValue } from "../../../App";
import Spinner from "../../utilities/Spinner";

interface Logout {
  PostContext: React.Context<PostContextValue>;
}

function Logout({ PostContext }: Logout) {
  const { handleLogout, setLogin } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mt-48">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="fixed">
      <div className="bg-textBlue w-fit md:w-[50vw] sm:w-[70vw] md:ml-24 sm:ml-8 ml-5 sm:mr-0 mr-5 sm:translate-x-14 my-0 mt-16 rounded-lg px-3 py-24 shadow-2xl">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-3xl text-textBlack text-center font-semibold">
            Are you sure you want to logout
          </p>
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => {
                handleLogout();
                navigate("/login");
                setLogin(true);
                setLoading(true);
              }}
              className="text-textBlack text-[15px] bg-textWhite px-12 py-2 rounded-lg transition"
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
