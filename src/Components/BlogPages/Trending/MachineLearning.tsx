import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { Excerpts } from "../../utilities/Excerpts";
import { Link } from "react-router-dom";
import Spinner from "../../utilities/Spinner";

function MachineLearning() {
  const [loading, setLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState([]);

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
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  //console.log(totalBlogs);

  const machineBlog: never[] = [];
  totalBlogs.map((blog) => {
    if (blog.category === "Machine Learning") {
      machineBlog.push(blog);
    } else {
      return;
    }
  });

  if (loading) {
    return (
      <div className="mt-40">
        <Spinner />;
      </div>
    );
  }

  //console.log(machineBlog);
  return (
    <div className="m-7 border border-borderIcon h-fit">
      <div className="max-w-[80%] mx-auto my-0 py-8">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Machine Learning</h2>
            <span className="text-[17px]">
              Explore different machine learning content you’d love
            </span>
          </div>
        </div>
        <div className="border border-borderIcon pt-5 rounded-md">
          <div className="py-5 pt-1">
            {machineBlog.map((blog) => (
              <div
                className="border-b border-b-borderIcon pb-5 pt-5 px-6"
                key={blog.uid}
              >
                <div className="w-[600px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-20 h-[82px] rounded-full"
                        src={blog.icon}
                        alt={blog.title}
                      />
                      <div>
                        <p className="font-semibold text-xl">{blog.author}</p>
                        <p className="flex items-center gap-2">
                          <span className="text-[16px]">{blog.category}</span>
                          <span className="text-sm"></span>
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/blogSection/${blog.id}`}
                      className="text-2xl font-semibold underline"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-[16px]">
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

export default MachineLearning;
