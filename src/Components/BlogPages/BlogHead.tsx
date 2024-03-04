

function BlogHead() {
  return (
    <div className=" flex items-center justify-between px-20 py-2 border border-r-0 border-l-0 border-borderIcon">
        <div className="flex items-center justify-center relative basis-[80%] ">
            <img src="/Images/search.svg" alt="Search Icon" className="absolute left-[28%]"/>
            <input type="text" placeholder="search chatter" className="w-[50%] px-3 pl-16 py-1.5 border border-borderIcon focus:outline-textBlue"/>
        </div>
        <div className="basis-[20%]">
            <img src="/Images/notifications.svg" alt="" />
            <div className="hidden">
              <img className="rounded-full w-8 h-8" src="" alt="" />
            </div>
        </div>
    </div>
  )
}

export default BlogHead