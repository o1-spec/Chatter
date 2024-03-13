import { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Excerpts } from "../utilities/Excerpts";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import { toast } from "react-toastify";

function TeamBlogs({ user, setActive }) {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully", {
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
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-40">
        <Spinner />
      </div>
    );
  }

  let teamBlogs = [];
  blogs.map((blog) => {
    if (blog.id === user.uid || blog.userId === user.uid) {
      teamBlogs.push(blog);
    } else {
      return;
    }
  });

  //console.log(teamBlogs)

  //console.log("blogs", blogs);
  //console.log(user.uid)
  return (
    <div className="m-7 border border-borderIcon rounded-md h-fit">
      <div className="px-8 py-6 h-full">
        <h3 className="text-4xl text-textBlack font-semibold">Your Stories</h3>
        <div className="flex flex-col gap-8 pt-8">
          {teamBlogs.map((blog, id) => (
            <div key={id} className="flex items-start gap-4 w-full">
              <img
                className="w-80 h-52 rounded-md"
                src={blog?.imageUrl || blog.imgUrl}
                alt={blog?.title}
              />
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-textWhite w-fit bg-textBlue px-2 py-2 rounded-md">
                  {blog?.category}
                </span>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-[18px]">{blog?.author}</p>
                  <p className="text-[15px]"></p>
                </div>
                <Link
                  to={`/blog/blogSection/${blog.id}`}
                  className="text-xl font-semibold underline w-fit"
                >
                  {blog?.title}
                </Link>
                <span>{Excerpts(blog?.description, 120)}</span>
                <div className="flex items-center gap-2 justify-between w-full">
                  <img
                    className="w-6 cursor-pointer"
                    src="/Images/pencil.svg"
                    alt="update Icon"
                    onClick={() => {
                      navigate(`/blog/updateBlog/${blog?.id}`);
                    }}
                  />
                  <img
                    className="w-6 cursor-pointer"
                    src="/Images/delete-2.svg"
                    alt="Delete Icon"
                    onClick={() => {
                      handleDelete(blog?.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamBlogs;
