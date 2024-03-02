function LoginForm() {
  return (
    <>
      <form className="flex flex-col gap-6">
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
        <button
          className=" text-textWhite text-[15px] border bg-textBlue px-6 py-3 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
          type="submit"
        >
          Log in
        </button>
      </form>
    </>
  );
}

export default LoginForm;
