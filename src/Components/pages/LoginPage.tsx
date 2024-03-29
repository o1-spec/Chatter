import LoginForm from "../utilities/LoginForm";
import { useContext } from "react";
import SignupForm from "../utilities/SignupForm";
import { PostContextValue } from "../../App";

interface LoginPage {
  PostContext: React.Context<PostContextValue>;
}

function LoginPage({ PostContext }: LoginPage) {
  const { logIn, setLogin, setUser } = useContext(PostContext);

  return (
    <div className="font-dmSans overflow-x-hidden">
      <div className="flex w-screen h-screen pb-6">
        <div className="fixed h-full basis-[38%] lg:w-[35%] md:w-[40%]">
          <div className="login-img md:block hidden absolute top-0 left-0 bottom-0 right-0 w-[95%] h-full -z-10"></div>
          <div className="lg:flex items-center hidden justify-center text-textWhite flex-col w-full h-full">
            <h5 className="text-4xl uppercase font-bold pb-6">Chatter</h5>
            <p className="text-[16px] px-8 pr-12">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </div>
        <div className="md:basis-[62%] pt-16 md:-translate-x-8 lg:pl-[50%] md:pl-[46%] px-6 w-full">
          <div className="md:w-[450px] sm:w-[450px] w-full my-0 mx-auto">
            <div className="flex justify-between pb-12 w-full">
              <div className="basis-1/2 relative">
                <p
                  onClick={() => setLogin(false)}
                  className="text-center pb-2 cursor-pointer"
                >
                  Register
                </p>
                {!logIn ? (
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-borderIcon"></span>
                )}
              </div>
              <div className="basis-1/2 relative">
                <p
                  onClick={() => setLogin(true)}
                  className="text-center pb-2 cursor-pointer"
                >
                  Log In
                </p>
                {logIn ? (
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-textBlue"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-borderIcon"></span>
                )}
              </div>
            </div>
            {logIn ? (
              <div className=" flex flex-col">
                <h4 className="text-3xl text-center pb-8 font-semibold">
                  Welcome Back
                </h4>
                <LoginForm setLogin={setLogin} setUser={setUser} />
              </div>
            ) : (
              <div className=" flex flex-col">
                <h4 className="text-3xl text-center pb-8 font-semibold">
                  Register as a Writer/Reader
                </h4>
                <SignupForm setLogin={setLogin} setUser={setUser} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
