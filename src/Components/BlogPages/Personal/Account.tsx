import { useContext, useState } from "react";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";

function Account({ PostContext }) {
  const { user } = useContext(PostContext);
  const currentUser = auth.currentUser;
  const [update, setUpdate] = useState(true);
  console.log(currentUser);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    updateProfile(currentUser, {
      photoURL: imageUrl,
    })
      .then(() => {
        console.log("Image uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleUpdateChange = () => {
    setUpdate(false);
  };

  //console.log(user);

  return (
    <div className="pt-8 px-16">
      <div className="">
        <h4 className="text-3xl font-semibold pb-10 text-textBlack">
          Account Info
        </h4>
        <div className="flex gap-8">
          <div className="basis-[60%] grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Firstname:</span>
              {update ? (
                <p className="text-[16px]">{user?.displayName.split(" ")[0]}</p>
              ) : (
                <input
                  type="text"
                  value={user?.displayName.split(" ")[0]}
                  name="firstName"
                  className="border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Lastname</span>
              {update ? (
                <p className="text-[16px]">{user?.displayName.split(" ")[1]}</p>
              ) : (
                <input
                  type="text"
                  value={user?.displayName.split(" ")[1]}
                  name="lastName"
                  className="border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Email</span>
              {update ? (
                <p className="text-[16px]">{user?.email}</p>
              ) : (
                <input
                  type="text"
                  value={user?.email}
                  name="email"
                  onChange={handleUpdateChange}
                  className=" border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Phone Number</span>
              {update ? (
                <p className="text-[16px]">{user?.phoneNumber}</p>
              ) : (
                <input
                  type="text"
                  value={user?.phoneNumber}
                  name="phoneNumber"
                  onChange={handleUpdateChange}
                  className="border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                />
              )}
            </div>
          </div>
          <div className="w-[220px] flex flex-col items-center -translate-y-16">
            <img
              src={user?.photoURL === null ? "/Images/user.png" : user?.photoURL}
              alt="Profile picture"
              className="rounded-full w-[600px] h-[220px] object-cover"
            />
            <div className="flex items-center flex-col">
              <label
                htmlFor="profile"
                className="cursor-pointer text-textWhite mt-4 text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
              >
                Upload Picture
                <input
                  type="file"
                  id="profile"
                  onChange={(e) => handlePicture(e)}
                  style={{ display: "none" }}
                />
              </label>
              <span className="text-sm text-textBlue inline-block pt-4">
                Change your Profile picture
              </span>
              <button
                onClick={handleUpdateChange}
                className="cursor-pointer text-textBlue mt-4 text-[15px] border bg-textWhite px-4 py-1 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p>Onadokun Oluwafemi &copy; </p>
        </div>
      </div>
    </div>
  );
}

export default Account;
