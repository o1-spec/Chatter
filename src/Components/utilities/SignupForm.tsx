/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupForm({ setActive, setUser,  setLogin}) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initialState);
  //const [signUp, setSignUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        return toast.error("Password don't match", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            fontSize: "1rem",
          },
        });
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      } else {
        return toast.error("All fields are mandatory to fill", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            fontSize: "1rem",
          },
        });
      }
      navigate("/blog/feed");
      setLogin(true)
    } catch (error) {
      const notify = () => {
        toast.error(`${error.message}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            fontSize: "1rem",
          },
        });
      };
      notify();
    }
  };
  return (
    <>
      <form className="flex flex-col gap-6 pb-16" onSubmit={handleAuth}>
        <div className="flex items-center gap-4 w-full">
          <div className=" flex gap-1 flex-col w-full">
            <label className="text-[14px]">First Name</label>
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="text"
              placeholder="John"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className=" flex gap-1 flex-col w-full">
            <label className="text-[14px]">Last Name</label>
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="text"
              placeholder="Doe"
              name="lastName"
              value={lastName}
              onChange={handleChange}
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
            name="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Password</label>
          <div className="relative">
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <img
              className="cursor-pointer absolute right-2 top-3"
              src="/Images/eye.svg"
              alt="eye-img"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Confirm Password</label>
          <div className="relative">
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
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
