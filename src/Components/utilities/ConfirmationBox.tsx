import { Link } from "react-router-dom";

function ConfirmationBox() {
  return (
    <div>
      <div className="pl-5">
        <Link to="/" className="flex gap-2">
          <span className="border border-textBlack rounded-full text-lg p-3 w-4 h-4 flex items-center justify-center">
            &lt;
          </span>
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full pt-32">
        <h4 className="text-3xl font-semibold">Enter confirmation code</h4>
        <span className="text-[15px]">
          We emailed you a code. Please input the code here for account
          verification
        </span>
        <div className="flex flex-col">
          <div className="flex items-end gap-8 py-6">
            <input
              type="text"
              className="border border-bgIcon w-20 p-5 rounded-md focus:outline-textBlue"
            />
            <input
              type="text"
              className="border border-bgIcon w-20 p-5 rounded-md focus:outline-textBlue"
            />
            <input
              type="text"
              className="border border-bgIcon w-20 p-5 rounded-md focus:outline-textBlue"
            />
            <input
              type="text"
              className="border border-bgIcon w-20 p-5 rounded-md focus:outline-textBlue"
            />
          </div>
          <button
            className=" text-textWhite w-full text-[15px] border bg-textBlue px-6 py-3 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300 mt-2"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationBox;
