import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

function LoginForm({setActive,setUser}) {
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    try {
      e.preventDefault();

      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/blog/feed");
        setUser(user)
      } else {
        return toast.error("All fields are mandatory", {
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
      <form className="flex flex-col gap-6" onSubmit={handleAuth}>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Email Address</label>
          <input
            className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <label className="text-[14px]">Password</label>
          <div className="relative">
            <input
              className="p-2 rounded-md w-[100%] placeholder:text-sm border border-borderIcon focus:outline-textBlue"
              type="password"
              placeholder="********"
              name="password"
              value={password}
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
          Log in
        </button>
      </form>
    </>
  );
}

export default LoginForm;
