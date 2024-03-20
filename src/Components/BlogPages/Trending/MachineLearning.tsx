import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { Excerpts } from "../../utilities/Excerpts";
import { Link } from "react-router-dom";
import Spinner from "../../utilities/Spinner";
import { toast } from "react-toastify";
import { logBookmark } from "../AnalyticsFunctions";
import { TrendingInterface } from "./TrendingInterface";

function MachineLearning() {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState<TrendingInterface[]>([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<TrendingInterface[]>(
    []
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

  //console.log(totalBlogs);

  const machineBlog: TrendingInterface[] = [];
  totalBlogs.map((blog) => {
    if (blog.category === "Machine Learning") {
      machineBlog.push(blog);
    } else {
      return;
    }
  });

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

  const handleBlogClick = async (blogId: string) => {
    try {
      const blogRef = doc(db, "blogs", blogId);
      const blogSnapshot = await getDoc(blogRef);
      const blogData = blogSnapshot.data();

      const updatedViews = (blogData?.views || 0) + 1;

      await updateDoc(blogRef, { views: updatedViews });

      setTotalBlogs((prevBlogs) => {
        return prevBlogs.map((blog) => {
          if (blog.id === blogId) {
            return { ...blog, views: updatedViews };
          } else {
            return blog;
          }
        });
      });
    } catch (error) {
      console.error("Error updating views:", error);
    }
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

  console.log(machineBlog);

  if (loading) {
    return (
      <div className="mt-40">
        <Spinner />;
      </div>
    );
  }

  //console.log(machineBlog);
  return (
    <div className="md:m-7 m-3 md:border border-borderIcon h-fit">
      <div className="md:max-w-[80%] mx-auto my-0 py-8 px-3 md:px-0">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Machine Learning</h2>
            <span className="text-[16px] pb-4 sm:pb-0">
              Explore different machine learning content you’d love
            </span>
          </div>
        </div>
        <div className="border border-borderIcon pt-5 rounded-md">
          <div className="py-5 pt-1">
            {machineBlog.map((blog) => (
              <div
                className="border-b border-b-borderIcon pb-5 pt-5 px-4 sm:px-6"
                key={blog.uid}
              >
                <div className="md:w-[450px] lg:w-[600px] w-fit my-0 mx-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 sm:justify-normal">
                      <img
                        className="w-20 h-[82px] rounded-full object-cover"
                        src={blog.icon || "/Images/user.png"}
                        alt={blog.title}
                      />
                      <div>
                        <p className="font-semibold sm:text-xl text-lg">
                          {blog.author}
                        </p>
                        <p className="flex flex-col gap-1 sm:gap-2">
                          <span className="text-[16px]">{blog.category}</span>
                          <span className="text-sm">
                            {blog?.createdAt
                              ?.toDate()
                              .toLocaleDateString("en-US", {
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
                      onClick={() => handleBlogClick(blog.id)}
                      className="sm:text-2xl text-xl font-semibold underline"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-[15px] md:text-[16px] sm:pr-6 pr-3">
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
                      onClick={() => {
                        logBookmark(blog?.id, blog?.title);
                        handleBookmark(blog.id);
                      }}
                      className="flex items-center gap-2"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MachineLearning;
