import { useState } from "react";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";

interface BlogHead {
  user: User | null;
  setBlogNav: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  handleSearch: (value: string) => void;
}

function BlogHead({ user, setBlogNav, handleSearch, setSearchOpen }: BlogHead) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchOpen(true);
    setSearchTerm(newValue);
    handleSearch(newValue);

    if(!newValue){
      setSearchOpen(false)
    }
  };

  return (
    <div className=" flex items-center justify-between md:px-20 px-4 sm:py-2 py-4 border border-r-0 border-l-0 border-borderIcon">
      <div className="pl-3 md:hidden absolute left-3">
        <i
          className="fa fa-bars text-2xl"
          aria-hidden="true"
          onClick={() => setBlogNav(true)}
        ></i>
      </div>
      <div className="ml-4 md:ml-0 flex items-center justify-center relative basis-[80%] ">
        <img
          src="/Images/search.svg"
          alt="Search Icon"
          className="absolute md:left-[28%] left-[18%]"
        />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search blogs by title"
          className="md:w-[50%] sm:w-[70%] w-[80%] px-3 md:pl-16 pl-12 py-1.5 border border-borderIcon focus:outline-textBlue"
          onChange={handleChange}
        />
      </div>
      <Link to="/blog/account" className="basis-[20%] flex gap-2 md:gap-4">
        <img src="/Images/notifications.svg" alt="" />
        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL === null ? "/Images/user.png" : user.photoURL}
              className="sm:w-10 w-12 sm:h-10 h-12 rounded-full object-cover"
              alt=""
            />
            <span className="text-sm font-semibold md:block hidden">
              {user.displayName}
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}

export default BlogHead;
