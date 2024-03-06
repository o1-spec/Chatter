function BlogHead({ user }) {
  return (
    <div className=" flex items-center justify-between px-20 py-2 border border-r-0 border-l-0 border-borderIcon">
      <div className="flex items-center justify-center relative basis-[80%] ">
        <img
          src="/Images/search.svg"
          alt="Search Icon"
          className="absolute left-[28%]"
        />
        <input
          type="text"
          placeholder="search chatter"
          className="w-[50%] px-3 pl-16 py-1.5 border border-borderIcon focus:outline-textBlue"
        />
      </div>
      <div className="basis-[20%] flex gap-4">
        <img src="/Images/notifications.svg" alt="" />
        {user && (
          <div className="flex items-center gap-2">
            <img src="/Images/user.png" className="w-10 h-10" alt="" />
            <span className="text-sm font-semibold">{user.displayName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogHead;
