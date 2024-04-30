import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../../firebase";
import {
  User,
  updateEmail,
  //updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { PostContextValue } from "../../../App";
import Spinner from "../../utilities/Spinner";

interface AccountProps {
  PostContext: React.Context<PostContextValue>;
}

interface updatedProfile {
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
}

function Account({ PostContext }: AccountProps) {
  const { user } = useContext(PostContext);
  const currentUser: User | null = auth.currentUser;
  const [update, setUpdate] = useState(true);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewEmail(user?.email || "");
    setNewDisplayName(user?.displayName || "");
  }, [user]);

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    // Upload file to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setNewPhotoURL(downloadURL);

        setLoading(false);
      });
    });
  };

  //console.log(user);
  const handleUpdateChange = () => {
    if (!currentUser) return;

    const updatedProfile: updatedProfile = {};

    if (newDisplayName !== user?.displayName) {
      updatedProfile.displayName = newDisplayName;
    }

    if (newDisplayName !== user?.displayName) {
      updateEmail(currentUser, newEmail)
        .then(() => {
          console.log("Email updated successfully");
        })
        .catch((error) => {
          console.error("Error updating email:", error);
        });
    }

    if (newPhotoURL !== user?.photoURL) {
      updatedProfile.photoURL = newPhotoURL;
    }

    updateProfile(currentUser, updatedProfile)
      .then(() => {
        console.log("Profile updated successfully");
        if (Object.keys(updatedProfile).length > 0) {
          location.reload();
          toast.success(
            "Profile Updated Successfully reload page if it doesn't display",
            {
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
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setNewPhotoURL("");
      });

    setUpdate(false);
  };

  //console.log(user);

  return (
    <div className="pt-8 sm:px-16 px-8">
      <div className="">
        <h4 className="text-3xl font-semibold pb-10 text-textBlack">
          Account Info
        </h4>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="basis-[60%] flex flex-col md:gap-y-24 sm:gap-y-16 gap-y-8">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Username</span>
              {update ? (
                <p className="text-[16px]">{user?.displayName}</p>
              ) : (
                <>
                  <input
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    name="firstName"
                    className="border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                  />
                  <span className="text-[14px]">
                    Ensure to add both firstname and lastname
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-[19px]">Email</span>
              {update ? (
                <p className="text-[16px]">{user?.email}</p>
              ) : (
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  name="email"
                  className=" border-[1.35px] border-textBlue focus:outline-none w-[75%] px-1 py-1 rounded-md"
                />
              )}
            </div>
          </div>
          <div className="md:w-[220px] flex flex-col items-center w-full justify-center md:justify-start md:-translate-y-16">
            {loading ? ( // Conditional rendering for loading spinner
              <div
                className="rounded-full md:w-[600px] w-[200px] h-[220px] object-cover"
                role="status"
              >
                <div className="mt-24">
                  <Spinner />
                </div>
              </div>
            ) : (
              <img
                src={
                  user?.photoURL === null || newPhotoURL === ""
                    ? "/Images/user.png"
                    : newPhotoURL || user?.photoURL
                }
                alt="Profile picture"
                className="rounded-full md:w-[600px] w-[200px] h-[220px] object-cover"
              />
            )}
            <div className="flex items-center flex-col">
              <label
                htmlFor="profile"
                className="cursor-pointer text-textWhite mt-4 text-[15px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
              >
                Upload Picture
                <input
                  type="file"
                  id="profile"
                  onChange={handlePicture}
                  style={{ display: "none" }}
                />
              </label>
              <span className="text-md text-textBlue inline-block pt-4">
                Change your Profile picture
              </span>
              <button
                onClick={() => {
                  handleUpdateChange();
                  //handlePhoneNumberUpdate();
                }}
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
