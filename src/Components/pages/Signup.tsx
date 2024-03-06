import SignupForm from "../utilities/SignupForm";

function Signup({ setActive, setUser }) {
  return (
    <div className="font-dmSans overflow-x-hidden">
      <div className="flex w-screen h-screen">
        <div className="fixed h-full basis-[38%] w-[40%]">
          <div className="login-img absolute top-0 left-0 bottom-0 right-0 w-[95%] h-full -z-10"></div>
          <div className="flex items-center justify-center text-textWhite flex-col w-full h-full">
            <h5 className="text-4xl uppercase font-bold pb-6">Chatter</h5>
            <p className="text-[16px] px-8 pr-12">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </div>
        <div className="basis-[62%] pt-4 -translate-x-8 pl-[50%]">
          <div className="w-[450px] my-0 mx-auto">
            <div className="flex justify-between pb-5">
              <div className="basis-1/2 relative">
                <p className="text-center pb-2">Register</p>
                <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
              </div>
              <div className="basis-1/2 relative">
                <p className="text-center pb-2">Log In</p>
                <span className="absolute bottom-0 left-0 w-full h-[4px] bg-borderIcon"></span>
              </div>
            </div>
            <div className=" flex flex-col">
              <h4 className="text-3xl text-center pb-8 font-semibold">
                Register as a Writer/Reader
              </h4>
              <SignupForm setActive={setActive} setUser={setUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
