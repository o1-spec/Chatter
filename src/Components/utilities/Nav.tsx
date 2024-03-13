import { Link } from "react-router-dom";

function Nav({ user, setLogin }) {
  return (
    <nav className=" flex items-center justify-between lg:py-5 lg:px-20">
      <div>
        <h3 className="lg:text-4xl text-textBlue uppercase font-bold">
          Chatter
        </h3>
      </div>
      <ul className="flex items-center gap-10">
        <li>
          <Link className="text-[16.5px] font-semibold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-[16.5px] font-semibold" to="/">
            About us
          </Link>
        </li>
        <li>
          <Link className="text-[16.5px] font-semibold" to="/">
            Contact
          </Link>
        </li>
        <li>
          <Link className="text-[16.5px] font-semibold" to="/">
            Blogs
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        {user ? (
          <Link to="/blog/feed" className="flex items-center gap-2">
            <img src="/Images/user.png" className="w-10 h-10" alt="" />
            <span className="text-sm font-semibold">{user.displayName}</span>
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className=" text-textBlue border text-sm border-textBlue px-6 py-2 rounded-lg"
              onClick={() => setLogin(true)}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="text-textWhite text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
              onClick={() => setLogin(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
