import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Spinner from "../utilities/Spinner";
import { db, auth } from "../../firebase";
import { toast } from "react-toastify";
import { TrendingInterface } from "../BlogPages/Trending/TrendingInterface";
import { Excerpts } from "../utilities/Excerpts";
import { Link } from "react-router-dom";
import { logBookmark } from "../BlogPages/AnalyticsFunctions";
import { User } from "firebase/auth";

function Recent() {
  const currentUser: User | null = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState<TrendingInterface[]>([]);
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<TrendingInterface[]>(
    []
  );

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
          autoClose: 500,
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
        const updatedLikes = [...currentLikes, userId];
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
        setLike(true);
        toast.success("You liked the post!", {
          position: "bottom-left",
          autoClose: 500,
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
        autoClose: 500,
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

  console.log(totalBlogs);

  const recentBlogs = totalBlogs.filter((blog) => {
    return blog.comments.length > 0;
  });

  console.log(recentBlogs);

  if (loading) {
    return (
      <div className="min-h-[40vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-[40vh]">
      <>
        {recentBlogs.map((blog, index) => (
          <div
            className="border-b border-b-borderIcon pb-2 pt-8 md:pt-10 sm:px-6 px-4"
            key={index}
          >
            <div className="w-fit md:w-[650px] my-0 mx-auto">
              <div className="flex flex-col gap-3">
                <div className="flex items-center sm:justify-normal gap-3">
                  <img
                    className="w-20 h-[82px] rounded-full object-cover"
                    src={
                      currentUser?.uid === blog.userId
                        ? currentUser?.photoURL ?? ""
                        : blog.icon ?? "/Images/user.png"
                    }
                    alt={blog.title}
                  />
                  <div>
                    <p className="font-semibold sm:text-xl text-lg">
                      {blog.author}
                    </p>
                    <p className="flex flex-col gap-1 sm:gap-2">
                      <span className="text-[15px] sm:text-[16px]">
                        {blog.category}
                      </span>
                      <span className="text-sm">
                        {blog?.createdAt?.toDate().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/blog/blogSection/${blog.id}`}
                  className="sm:text-2xl text-xl font-semibold underline"
                >
                  {blog.title}
                </Link>
                <p className="text-[15px] md:text-[16px] pr-6">
                  {Excerpts(blog?.description, 250)}
                </p>
                <img
                  className="w-fit"
                  src={blog.imageUrl || blog.imgUrl}
                  alt={blog.title}
                />
              </div>
              <div className="flex items-center justify-between pt-4 pb-4">
                <div className="flex items-center gap-2">
                  <i
                    onClick={() => handleLike(blog.id)}
                    className={
                      like
                        ? "fa-regular fa-heart cursor-pointer text-textBlue"
                        : "fa-regular fa-heart cursor-pointer"
                    }
                  ></i>
                  <span className="text-sm">{blog.likes.length}</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    logBookmark(blog?.id, blog?.title);
                    handleBookmark(blog.id);
                  }}
                >
                  <i
                    className={
                      bookmarkedBlogs.some((b) => b.id === blog.id)
                        ? "fa-regular fa-bookmark text-textBlue cursor-pointer"
                        : "fa-regular fa-bookmark cursor-pointer"
                    }
                  ></i>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/Images/analytics.svg" className="w-3" alt="" />
                  <span className="text-sm">
                    {blog.views || blog.view.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}{" "}
      </>
    </div>
  );
}

export default Recent;
