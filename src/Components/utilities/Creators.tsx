import { Link } from "react-router-dom";

function Creators() {
  return (
    <div className="py-20">
      <div className="flex max-w-[1100px] mx-auto my-0 px-4 gap-16 items-center">
        <div className="grid grid-cols-2 gap-y-11 gap-x-0 basis-[35%]">
          <img
            className="rounded-full w-36"
            src="/Images/Icon_3.png"
            alt="Icon-1"
          />
          <div className="row-span-2 flex items-center justify-center">
            <img
              className="rounded-full w-36"
              src="/Images/Icon_1.png"
              alt="Icon-2"
            />
          </div>
          <img
            className="rounded-full w-36"
            src="/Images/Icon_2.png"
            alt="Icon-3"
          />
        </div>
        <div className="flex flex-col gap-6 basis-[65%] pr-16">
          <h6 className="text-5xl font-semibold text-textBlack leading-[52px]">
            Write, read and connect with great minds on chatter
          </h6>
          <p className="text-[15px]">
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals
          </p>
          <Link
            to="/"
            className="text-textWhite w-28 text-[15px] bg-textBlue px-3 border py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Creators;
