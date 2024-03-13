import { Link } from "react-router-dom";

function Owner() {
  return (
    <div className="bg-bgCream py-16">
      <div className="lg:max-w-[1100px] my-0 mx-auto flex flex-col gap-8 items-center md:px-0 px-6 lg:flex-row">
        <div className="basis-[20%] flex items-start justify-start">
          <img className="rounded-full w-56" src="/Images/Icon_4.png" alt="" />
        </div>
        <div className="flex flex-col basis-[80%] justify-center items-center lg:items-start">
          <p className="text-[15px] pb-8 sm:text-[17px] sm:text-center md:px-6 lg:text-start">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <span className="text-lg font-semibold block pb-6">
            Adebobola Muhydeen <span className="font font-normal text-[14px] md:text-[16px]">Software developer at Apple</span>
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
