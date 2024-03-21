import { useState, useEffect } from "react";

import { TrendingInterface } from "./Trending/TrendingInterface";
import {
  onSnapshot,
  collection,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import Spinner from "../utilities/Spinner";
import { logBookmark } from "./AnalyticsFunctions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Analytics() {
  const [like, setLike] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState<TrendingInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<TrendingInterface[]>(
    []
  );
  const [highestViews, setHighestViews] = useState<TrendingInterface | null>(
    null
  );
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const unsub = onSnapshot(
          collection(db, "blogs"),
          (snapshot) => {
            const list: TrendingInterface[] = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() } as TrendingInterface);
            });
            setTotalBlogs(list);
            setLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );

        return () => {
          unsub();
        };
      } catch (err) {
        if (err instanceof Error) {
          // e is narrowed to Error!
          console.log(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    const storedBookmarkString = localStorage.getItem("bookmarkedBlogs");
    if (storedBookmarkString) {
      const storedBookmark: TrendingInterface[] =
        JSON.parse(storedBookmarkString);
      setBookmarkedBlogs(storedBookmark);
    }
  }, []);

  if (bookmark) {
    console.log("yes");
  }

  const handleBookmark = (blogId: string) => {
    const isBookmarked = bookmarkedBlogs.some((blog) => blog.id === blogId);

    let updatedBookmarks: TrendingInterface[] = [];

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

  const handleLike = async (blogId: string) => {
    const userId: string | undefined = auth.currentUser?.uid;
    const blogRef = doc(db, "blogs", blogId);
    try {
      const blogSnapshot = await getDoc(blogRef);
      const blogData = blogSnapshot.data();
      const currentLikes = blogData?.likes || [];

      if (currentLikes.includes(userId)) {
        // If user already liked, remove like
        const updatedLikes = currentLikes.filter(
          (id: string | undefined) => id !== userId
        );
        await updateDoc(blogRef, { likes: updatedLikes });

        setTotalBlogs((prevBlogs) => {
          return prevBlogs.map((blog) => {
            if (blog.id === blogId) {
              return { ...blog, likes: updatedLikes };
            } else {
              return blog;
            }
          });
        });
        setLike(false);

        toast.info("You unliked the post!", {
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
        // If user hasn't liked, add like
        const updatedLikes = [...currentLikes, userId];
        await updateDoc(blogRef, { likes: updatedLikes });

        setTotalBlogs((prevBlogs: TrendingInterface[]) => {
          return prevBlogs.map((blog) => {
            if (blog.id === blogId) {
              return { ...blog, likes: updatedLikes };
            } else {
              return blog;
            }
          });
        });
        setLike(true);

        toast.success("You liked the post!", {
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
      console.error("Error updating likes:", error);
      toast.error("Failed to like the post. Please try again later.", {
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
  };
  useEffect(() => {
    let maxViews = -1;
    let highestViewBlog = null;

    totalBlogs.forEach((blog) => {
      if (blog.views > maxViews) {
        maxViews = blog.views;
        highestViewBlog = blog;
      }
    });

    if (highestViewBlog) {
      setHighestViews(highestViewBlog);
    }
  }, [totalBlogs]);

  console.log(highestViews);
  /*
  const milliseconds = highestViews?.createdAt * 1000;

  const date = new Date(milliseconds);

  const formattedNewDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });*/

  //Geeting current month
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const formattedDate = monthNames[monthIndex] + " " + year;
  const formattedString = highestViews?.description;
  const wordsArray = formattedString?.split(/\s+/);
  const slicedArray = wordsArray?.slice(0, 50);
  const shortenedString = slicedArray?.join(" ");
  if (loading) {
    return (
      <div className="mt-[400px]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="md:m-7 m-3 h-fit">
      <div className="md:max-w-[88%] lg:md-w-[98%]  mx-auto my-0 py-8 px-3 md:px-0">
        <div className="flex flex-col pb-6">
          <div className="flex flex-col gap-3 border-b-4 w-full mr-8 border-b-textBlue">
            <h2 className="text-3xl font-semibold">Posts Analytics</h2>
            <div className="flex items-center sm:gap-1 gap-2 pb-2">
              <span className="font-semibold">{formattedDate}</span>
              <span className="text-[14px] pb-0 sm:pb-0">25 days so far</span>
            </div>
          </div>
          {!highestViews ? (
            <div className="flex flex-col gap-4 py-8 items-center">
              <p className="text-center text-lg pb-1">
                You have not posted any blog yet
              </p>
              <Link
                className="text-textWhite bg-textBlue px-3 py-4 rounded-md w-fit"
                to="/blog/publish"
              >
                Publish Book
              </Link>
            </div>
          ) : (
            <div className="border-b-4 border-b-textBlue pr-10">
              <h5 className="text-xl font-semibold py-3">Posts Highlights</h5>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">
                  Top Post with the highest views
                </p>
                <span>earned {highestViews.views} Impressions</span>
              </div>
              <div className="max-w-[600px] flex flex-col gap-3 pt-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={highestViews?.icon}
                    className="w-20 rounded-full object-cover"
                    alt={highestViews?.title}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      {highestViews?.author}
                    </span>
                    <span className="text-[14px]">
                      {highestViews?.createdAt
                        ?.toDate()
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/blog/blogSection/${highestViews?.id}`}
                  className="text-xl font-semibold underline"
                >
                  {highestViews?.title}
                </Link>
                <p>{shortenedString}</p>
                <div className="flex items-center justify-between pt-4 pb-4">
                  <div className="flex items-center gap-2">
                    <i
                      onClick={() => handleLike(highestViews?.id)}
                      className={
                        like
                          ? "fa-regular fa-heart cursor-pointer text-textBlue"
                          : "fa-regular fa-heart cursor-pointer"
                      }
                    ></i>
                    <span className="text-sm">
                      {highestViews?.likes?.length}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      logBookmark(highestViews?.id, highestViews?.title);
                      handleBookmark(highestViews?.id);
                    }}
                    className="flex items-center gap-2"
                  >
                    <i
                      className={
                        bookmarkedBlogs.some((b) => b.id === highestViews?.id)
                          ? "fa-regular fa-bookmark text-textBlue cursor-pointer"
                          : "fa-regular fa-bookmark cursor-pointer"
                      }
                    ></i>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/Images/analytics.svg" className="w-3" alt="" />
                    <span className="text-sm">
                      {highestViews?.views || highestViews?.view?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="pt-4">
            <p className="text-center">Copyright &copy; Onadokun Oluwafemi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
