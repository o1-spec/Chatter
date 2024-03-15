import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
//import { getDownloadURL, listAll, ref } from "firebase/storage";
//import { storage } from "../../../firebase";
import { db } from "../../../firebase";
import { Excerpts } from "../../utilities/Excerpts";
import { Link } from "react-router-dom";
import Spinner from "../../utilities/Spinner";
import { TrendingInterface } from "./TrendingInterface";

function See() {
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState<TrendingInterface[]>([]);
  //const [, setImageUrl] = useState([]);

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

  //console.log(totalBlogs);
  /*
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

        //setImageUrl(urls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);*/
  /*
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
*/

  const convertSecondsToDate = (seconds: number) => {
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

  if (loading) {
    return (
      <div className="mt-40">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="md:m-7 m-3 md:border border-borderIcon h-fit">
      <div className="md:max-w-[80%] mx-auto my-0 py-8 px-3 md:px-0">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">All Blogs</h2>
            <span className="text-[16px] pb-4 sm:pb-0">
              Explore All types of content you’d love
            </span>
          </div>
        </div>
        <div className="border border-borderIcon pt-5 rounded-md">
          <div className="py-5 pt-1">
            {totalBlogs.map((blog, index) => (
              <div
                className="border-b border-b-borderIcon pb-5 pt-5 px-4 sm:px-6"
                key={index}
              >
                <div className="md:w-[450px] lg:w-[600px] w-fit my-0 mx-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 sm:justify-normal">
                      <img
                        className="w-20 h-[82px] rounded-full object-cover"
                        src={blog.icon}
                        alt={blog.title}
                      />
                      <div>
                        <p className="font-semibold sm:text-xl text-lg">
                          {blog.author}
                        </p>
                        <p className="flex flex-col gap-1 sm:gap-2">
                          <span className="text-[16px]">{blog.category}</span>
                          <span className="text-sm">
                            {convertSecondsToDate(blog.createdAt)}
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
                    <p className="text-[15px] md:text-[16px] sm:pr-6 pr-3">
                      {Excerpts(blog?.description, 250)}
                    </p>
                    <img
                      className="w-fit"
                      src={blog.imageUrl}
                      alt={blog.title}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-4 pb-4">
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-heart cursor-pointer"></i>
                      <span className="text-sm">{blog.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-bookmark cursor-pointer"></i>
                      <span className="text-sm">30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/Images/analytics.svg" className="w-3" alt="" />
                      <span className="text-sm">{blog.views}</span>
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

export default See;
