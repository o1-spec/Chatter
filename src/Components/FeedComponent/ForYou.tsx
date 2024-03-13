import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import { Excerpts } from "../utilities/Excerpts";
import { Link } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import { toast } from "react-toastify";

function ForYou() {
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const unsub = onSnapshot(
          collection(db, "blogs"),
          (snapshot) => {
            const list: object[] = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setTotalBlogs(list);
          },
          (error) => {
            console.log(error);
          }
        );

        return () => {
          unsub();
        };
        //const querySnapshot = await getDocs(collection(db, "blogs"));
        //const documentsData = querySnapshot.docs.map((doc) => doc.data());
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePaths = await getImagePaths();
        const urls = await Promise.all(
          imagePaths.map(async (path) => {
            const storageRef = ref(storage, path);
            return await getDownloadURL(storageRef);
          })
        );

        setImageUrl(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedBlogs"));
    if (storedBookmarks) {
      setBookmarkedBlogs(storedBookmarks);
    }
  }, []);

  console.log(bookmarkedBlogs);

  const getImagePaths = async () => {
    try {
      const imagesRef = ref(storage, "/Icon-img"); // Change this to your directory path
      const imageList = await listAll(imagesRef);
      const paths = imageList.items.map((item) => item.fullPath);
      return paths;
    } catch (error) {
      console.error("Error fetching image paths:", error);
      return [];
    }
  };

  const convertSecondsToDate = (seconds) => {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;

    const date = new Date(milliseconds);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedDate;
  };

  const handleBookmark = (blogId) => {
    const isBookmarked = bookmarkedBlogs.some((blog) => blog.id === blogId);

    let updatedBookmarks = [];

    if (isBookmarked) {
      updatedBookmarks = bookmarkedBlogs.filter((blog) => blog.id !== blogId);
      toast.error("One Content removed from Bookmarks", {
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
    } else {
      const blogToAdd = totalBlogs.find((blog) => blog.id === blogId);
      if (blogToAdd) {
        updatedBookmarks = [...bookmarkedBlogs, blogToAdd];
        toast.success("One Content Bookmarked", {
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
    }

    localStorage.setItem("bookmarkedBlogs", JSON.stringify(updatedBookmarks));
    setBookmarkedBlogs(updatedBookmarks);
    setBookmark(true);
  };

  return (
    <div className="py-5 pt-1 min-h-[40vh]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {totalBlogs.map((blog, index) => (
            <div
              className="border-b border-b-borderIcon pb-2 pt-10 px-6"
              key={index}
            >
              <div className="w-[650px] my-0 mx-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-20 h-[82px] rounded-full"
                      src={blog.icon}
                      alt={blog.title}
                    />
                    <div>
                      <p className="font-semibold text-xl">{blog.author}</p>
                      <p className="flex flex-col gap-2">
                        <span className="text-[16px]">{blog.category}</span>
                        <span className="text-sm">
                          {convertSecondsToDate(blog.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/blog/blogSection/${blog.id}`}
                    className="text-2xl font-semibold underline"
                  >
                    {blog.title}
                  </Link>
                  <p className="text-[16px] pr-6">
                    {Excerpts(blog?.description, 250)}
                  </p>
                  <img className="w-fit" src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="flex items-center justify-between pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-heart cursor-pointer"></i>
                    <span className="text-sm">{blog.likes}</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleBookmark(blog.id)}
                  >
                    <i
                      className={
                        bookmarkedBlogs.some((b) => b.id === blog.id)
                          ? "fa-regular fa-bookmark text-textBlue cursor-pointer"
                          : "fa-regular fa-bookmark cursor-pointer"
                      }
                    ></i>
                    <span className="text-sm">30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/Images/analytics.svg" className="w-3" alt="" />
                    <span className="text-sm">{blog.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </>
      )}
    </div>
  );
}

export default ForYou;
