import { Link } from "react-router-dom";

function Owner() {
  return (
    <div className="bg-bgCream py-16">
      <div className="lg:max-w-[1100px] my-0 mx-auto flex gap-8 items-center">
        <div className="basis-[20%]">
          <img className="rounded-full w-56" src="/Images/Icon_4.png" alt="" />
        </div>
        <div className="fle flex-col basis-[80%]">
          <p className="text-[15px] pb-8">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <span className="text- font-semibold block pb-6">
            Adebobola Muhydeen <span className="font font-normal text-[14px]">Software developer at Apple</span>
          </span>
          <Link
            to="/"
            className="text-textWhite text-[15px] bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
          >
            Join Chatter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Owner;
