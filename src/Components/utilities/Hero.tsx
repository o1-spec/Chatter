import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-28">
        <div className="hero-bg absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10"></div>
      <div className="flex flex-col gap-8">
        <h5 className="text-4xl text-textWhite font-bold leading-[47px]">Welcome to Chatter: A Haven for Text- <span className="block"> Based Content</span></h5>
        <p className="text-lg text-textWhite">
          Unleash the Power of Words, Connect with Like-minded Readers and
          Writers
        </p>
        <Link className="w-32 text-textWhite text-[14px]  bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300" to="/">Get Started</Link>
      </div>
    </div>
  );
}

export default Hero;
