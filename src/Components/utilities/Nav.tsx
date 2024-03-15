import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "firebase/auth";

function Nav({
  user,
  setLogin,
}: {
  user: User | null;
  setLogin: (isLoggedIn: boolean) => void;
}) {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(true);
  }

  function cancelNav() {
    setNav(false);
  }

  return (
    <nav className="flex fixed z-50 top-0 right-0 w-full bg-textWhite left-0 items-center justify-between lg:py-5 px-4 py-3 lg:px-20 sm:py-4">
      <div>
        <h3 className="lg:text-3xl  text-3xl text-textBlue uppercase font-bold">
          Chatter
        </h3>
      </div>
      <ul
        className={
          nav === false
            ? "fixed md:relative md:translate-y-0 -translate-y-[100%] transition-all duration-300 flex flex-col items-center md:justify-center justify-start md:flex-row top-0 left-0 right-0 md:h-fit h-[100vh] w-full bottom-0 bg-textWhite pl-4 md:pl-0 md:bg-none md:pt-0 pt-20 md:pr-0 pr-1 md:items-center md:gap-8 gap-8 z-20"
            : "fixed md:relative md:translate-y-0 translate-y-0 transition-all duration-300 flex flex-col items-center md:justify-center justify-start md:flex-row top-0 left-0 md:h-fit right-0 min-h-[100vh] w-full bottom-0 bg-textWhite pl-4 md:pl-0 md:bg-none md:pt-0 pt-20 md:pr-0 pr-1 md:items-center md:gap-8 gap-8 z-20 md:z-0"
        }
      >
        <h3 className="lg:text-3xl md:hidden text-3xl text-textBlue uppercase font-bold">
          Chatter
        </h3>
        <div className="md:hidden absolute right-8 top-4">
          <i
            className="fa fa-times text-3xl"
            aria-hidden="true"
            onClick={cancelNav}
          ></i>
        </div>
        <li>
          <Link
            className="md:text-[16.5px] md:text-textBlack text-xl font-semibold"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="md:text-[16.5px] md:text-textBlack text-xl font-semibold"
            to="/"
          >
            About us
          </Link>
        </li>
        <li>
          <Link
            className="md:text-[16.5px] md:text-textBlack text-xl font-semibold"
            to="/"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="md:text-[16.5px] md:text-textBlack text-xl font-semibold"
            to={!user ? "/login" : "/blog/feed"}
          >
            Blogs
          </Link>
        </li>
        <div className="md:hidden">
          {!user && (
            <div className="flex flex-col gap-6">
              <Link
                to="/login"
                className=" text-textBlue border text-md text-center border-textBlue w-40 px-6 py-3 rounded-lg"
                onClick={() => setLogin(true)}
              >
                Login
              </Link>
              <Link
                to="/login"
                className="text-textWhite text-[15px] border bg-textBlue px-6 py-3 w-40 text-center rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
                onClick={() => setLogin(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </ul>
      <div className="flex items-center gap-4 md:pr-4 pr-12">
        {user ? (
          <Link to="/blog/feed" className="flex items-center gap-2">
            {user.photoURL === null ? (
              <img src="/Images/user.png" className="w-10 h-10" alt="" />
            ) : (
              <img className="w-10 h-10 rounded-full" src={user.photoURL} />
            )}
            <span className="sm:block hidden text-sm font-semibold">
              {user.displayName}
            </span>
          </Link>
        ) : (
          <div className="hidden md:flex md:gap-4">
            <Link
              to="/login"
              className=" text-textBlue border text-sm border-textBlue px-6 py-2 h-fit rounded-lg"
              onClick={() => setLogin(true)}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="text-textWhite text-[15px] text-center border bg-textBlue px-6 py-2 rounded-lg h-fit w-28 transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
              onClick={() => setLogin(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      <div className="pr-3 md:hidden absolute right-4" onClick={handleNav}>
        <i className="fa fa-bars text-2xl" aria-hidden="true"></i>
      </div>
    </nav>
  );
}

export default Nav;
