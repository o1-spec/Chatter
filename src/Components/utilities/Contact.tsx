import { User } from "firebase/auth";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Contact({
  user,
  setLogin,
}: {
  user: User | null;
  setLogin: (isLoggedIn: boolean) => void;
}) {
  return (
    <div>
      <div className="">
        <Nav user={user} setLogin={setLogin} />
      </div>
      <div className="py-20 pt-28 md:pl-20 sm:pl-8 px-6 ms:px-0 border-t-2 border-t-textBlue">
        <div className="flex flex-col items-center gap-3 justify-center">
          <h3 className="sm:text-4xl text-3xl font-semibold text-textBlue text-center">
            We have been waiting for you
          </h3>
          <p className="text-center">
            We want to hear from you. Let us know how we can help
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-12 py-5 px-3 bg-bgCream w-[400px]">
            <h6 className="text-xl font-semibold text-center">
              Contact us via
            </h6>
            <div className="flex flex-col gap-4 px-4 py-4">
              <Link
                to="https://twitter.com/Oluwafemi166"
                className="bg bg-textWhite px-2 py-2 flex gap-2 items-center shadow-lg"
              >
                <i className="fa-brands fa-twitter"></i>
                <span className="font-semibold text-md">Twitter</span>
              </Link>
              <Link
                to="tel:07058266972"
                className="bg bg-textWhite px-2 py-2 flex gap-2 items-center shadow-lg"
              >
                <i className="fa-solid fa-phone"></i>
                <span className="font-semibold text-md">Phone Call</span>
              </Link>
              <Link
                to="mailto:oluwafemionadokun@gmail.com"
                className="bg bg-textWhite px-2 py-2 flex gap-2 items-center shadow-lg"
              >
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span className="font-semibold text-md">Mail</span>
              </Link>
              <Link
                to="https://instagram.com/black_dokun"
                className="bg bg-textWhite px-2 py-2 flex gap-2 items-center shadow-lg"
              >
                <i className="fa-brands fa-instagram"></i>
                <span className="font-semibold text-md">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
