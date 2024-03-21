import { User } from "@firebase/auth";
import { Link } from "react-router-dom";

function Creators({ user }: { user: User | null }) {
  return (
    <div className="py-20">
      <div className="flex flex-col max-w-[1100px] lg:flex-row mx-auto my-0 md:px-4 px-6 gap-16 items-center">
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
        <div className="flex flex-col gap-6 md:gap-4 basis-[65%] pr-16 items-center md:pr-2 justify-center lg:text-start lg:justify-start lg:items-start">
          <h6 className="md:text-4xl text-4xl font-semibold md:text-center text-textBlack md:leading-[45px] leading-[40px] lg:text-start">
            Write, read and connect with great minds on chatter
          </h6>
          <p className="text-[15px] md:text-center md:text-[16px] lg:text-start">
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals
          </p>
          {!user ? (
            <Link
              to="/login"
              className="text-textWhite text-center md:w-36 md:text-center md:text-lg w-32 text-[15px] bg-textBlue md:px-3 px-4 border md:py-2 py-3 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
            >
              Get started
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Creators;
