/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import {
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { PostContextValue } from "../../App";

const initialState = {
  title: "",
  category: "",
  description: "",
  comments: [],
  likes: [],
};

const categoryOption = [
  "Programming",
  "Data Science",
  "Technology",
  "Machine Learning",
  "Politics",
];

interface BlogData {
  title: string;
  category: string;
  description: string;
}

interface PostBlogProps {
  PostContext: React.Context<PostContextValue>;
}

type File = Blob | null;

type ImageUrl = string | null;

type Comment = any[];

type Progress = number | null;

function PostBlog({ PostContext }: PostBlogProps) {
  const { user } = useContext(PostContext);
  const [plus, setPlus] = useState(true);
  const [minus, setMinus] = useState(false);
  const [picture, setPicture] = useState(false);
  const [imageUrl, setImageUrl] = useState<ImageUrl>(null);
  const [form, setForm] = useState(initialState);
  const [isDirty, setIsDirty] = useState(false);
  const [file, setFile] = useState<File>(null);
  const navigate = useNavigate();
  const [exitBox, setExitBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [progress, setProgress] = useState<Progress>(null);
  let [likes, setLikes] = useState([]);
  const { id } = useParams();

  const { title, category, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress: Progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully", {
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
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setComments(snapshot.data().comments ? snapshot.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
  };

  const handlePlus = () => {
    setMinus(true);
    setPlus(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const imageUrl: string = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setPicture(false);
    setMinus(false);
    setPlus(false);

    setForm((prev) => ({ ...prev, imgUrl: imageUrl }));
  };

  const handleMinus = () => {
    setMinus(false);
    setPlus(true);
  };

  const handlePicture = () => {
    setPicture(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            createdAt: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully", {
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
        } catch (err) {
          toast.error(err.message, {
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
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/blog/teamBlogs");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleExitConfirmation = (confirmExit: boolean) => {
    if (confirmExit) {
      // User confirmed to exit without saving
      setIsDirty(false);
      navigate("/blog/feed");
    } else {
      setExitBox(false);
    }
  };

  console.log(form);

  return (
    <>
      <form
        className="py-4 pt-10 px-8 pl-12 relative h-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="w-full h-fit">
            {plus ? (
              <img
                className="w-10 cursor-pointer"
                src="/Images/Plus.png"
                alt="Plus-Img"
                onClick={handlePlus}
              />
            ) : (
              <div className="flex items-center gap-4">
                <img
                  className="w-16 pr-5 border-r border-r-textGrey cursor-pointer"
                  src="/Images/minus.png"
                  alt="Minus"
                  onClick={handleMinus}
                />
                <div className="flex gap-2">
                  <label htmlFor="picture">
                    <img
                      className="w-10 cursor-pointer"
                      src="/Images/picture.png"
                      alt="picture"
                      onClick={handlePicture}
                    />
                    <input
                      type="file"
                      id="picture"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleImageChange(e);
                        setFile(e.target.files[0]);
                        setMinus(false);
                        setPlus(false);
                      }}
                    />
                  </label>
                  <img
                    className="w-10 cursor-pointer"
                    src="/Images/video.png"
                    alt="video"
                  />
                </div>
              </div>
            )}
            {/*picture && (
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  name="picture"
                  onChange={(e) => {
                    handleImageChange(e);
                    setFile(e.target.files[0]);
                    setMinus(false);
                    setPlus(false);
                  }}
                />
              </div>
                )*/}
            {imageUrl && (
              <div className="w-[80%] h-fit">
                <img src={imageUrl} alt="Selected" className="w-full h-full" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <input
                className="py-6 border border-none focus:outline-none placeholder:text-4xl text-4xl placeholder:text-textGrey text-textBlack w-full"
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div>
              <textarea
                className="px-4 py-3 placeholder:text-lg text-lg focus:outline-none textarea-class placeholder:text-textGrey text-textBlack scroll"
                placeholder="Write a Post ....."
                onChange={handleChange}
                value={description}
                name="description"
                style={{ minHeight: "120px" }}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 pb-24">
            <select value={category} onChange={onCategoryChange}>
              <option>Please select category</option>
              {categoryOption.map((option, index) => (
                <option value={option || ""} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <button
            type="submit"
            disabled={progress !== null && progress < 100}
            className="text-textWhite text-[17px] border bg-textBlue px-6 py-2 rounded-lg transition hover:bg-textWhite hover:text-textBlue border-textBlue duration-300"
          >
            {id ? "Update" : "Publish"}
          </button>
        </div>
      </form>
      {exitBox && (
        <div className="absolute top-[30vh] left-[40vw] z-50">
          <div className="flex flex-col gap-6 items-center justify-center w-[400px] bg-textWhite shadow-lg py-12 rounded-lg px-6">
            <p className="text-textBlack text-lg font-semibold text-center">
              Are you sure you want to leave without saving your changes
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  handleExitConfirmation(true);
                }}
                className=" text-textBlue border text-md text-center border-textBlue w-40 px-6 py-3 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => handleExitConfirmation(false)}
                className=" bg-textBlue border text-md text-center border-textBlue w-40 px-6 py-3 rounded-lg text-textWhite"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostBlog;
