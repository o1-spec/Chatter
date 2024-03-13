import { Link } from "react-router-dom";

function Footer() {
  return (
    <div data-aos="zoom-in" className=" py-16 bg-bgCream">
      <div className="lg:max-w-[1100px] my-0 mx-auto flex gap-8 justify-between px-4">
        <h5 className="lg:text-2xl text-textBlue uppercase font-bold">Chatter</h5>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-lg pb-2">Explore</h6>
          <Link className="text-[15px]" to="/">community</Link>
          <Link className="text-[15px]" to="/">Trending Blogs</Link>
          <Link className="text-[15px]" to="/">Chatter for teams</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-lg pb-2">Support</h6>
          <Link className="text-[15px]" to="/">Support docs</Link>
          <Link className="text-[15px]" to="/">Join slack</Link>
          <Link className="text-[15px]" to="/">Contact</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-lg pb-2">Explore</h6>
          <Link className="text-[15px]" to="/">Official blog</Link>
          <Link className="text-[15px]" to="/">Engineering blog</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
