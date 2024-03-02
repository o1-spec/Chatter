import { Link } from "react-router-dom";

function SignupForm() {
  return (
    <>
      <form className="flex flex-col gap-6 pb-16">
        <div className="flex items-center gap-4 w-full">
          <div className=" flex gap-1 flex-col w-full">
            <label className="text-[14px]">First Name</label>
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="text"
              placeholder="John"
            />
          </div>
          <div className=" flex gap-1 flex-col w-full">
            <label className="text-[14px]">Last Name</label>
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className=" flex gap-1 flex-col w-full">
          <label className="text-[14px]">You are joining as?</label>
          <select className="p-2 pr-4 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue">
            <option value="Writer">Writer</option>
            <option value="User">User</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Email Address</label>
          <input
            className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Password</label>
          <div className="relative">
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="password"
              placeholder="********"
            />
            <img
              className="cursor-pointer absolute right-2 top-3"
              src="/Images/eye.svg"
              alt="eye-img"
            />
          </div>
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Confirm Password</label>
          <div className="relative">
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="password"
              placeholder="********"
            />
            <img
              className="cursor-pointer absolute right-2 top-3"
              src="/Images/eye.svg"
              alt="eye-img"
            />
          </div>
        </div>
        <button
          className=" text-textWhite text-[15px] border bg-textBlue px-6 py-3 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
          type="submit"
        >
          Create Account
        </button>
        <Link
          className=" text-textBlack text-[15px] border border-bgIcon px-6 py-3 rounded-lg text-center flex items-center justify-center gap-2"
          to="/"
        >
          <img src="/Images/Google.svg" alt="Google Icon" />
          <span>Sign up with Google</span>
        </Link>
        <Link
          className=" text-textBlack text-[15px] border border-bgIcon px-6 py-3 rounded-lg text-center flex items-center gap-2 justify-center"
          to=""
        >
          <img src="/Images/LinkedIn.svg" alt="LinkedIn Icon" />
          <span>Sign up with LinkedIn</span>
        </Link>
      </form>
    </>
  );
}

export default SignupForm;
