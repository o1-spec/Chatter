import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase";

function BlogSection() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  const { id } = useParams();
  console.log(blogs);
  useEffect(() => {
    if (blogs.length > 0) {
      const foundBlog = blogs.find((blog) => blog.id === id);
      setSelectedBlog(foundBlog);
    }
  }, [blogs, id]);

  console.log(selectedBlog);

  return (
    <div className="py-8 px-3">
      <div className="flex flex-col gap-10 mx-32">
        <img
          className="w-[750px] h-[430px]"
          src={selectedBlog?.imgUrl || selectedBlog?.imageUrl}
          alt={selectedBlog?.title}
        />
        <div>
          <h5 className="text-4xl font-semibold pb-2">{selectedBlog?.title}</h5>
          <div className="flex items-center gap-2 pb-4">
            <p className="font-semibold text-xl">
              Written By : &nbsp;{selectedBlog?.author}
            </p>
            {selectedBlog?.timestamp ? (
              <span>{selectedBlog?.timestamp.toDate().toDateString()}</span>
            ) : (
              <span>{selectedBlog?.createdAt.toDate().toDateString()}</span>
            )}
          </div>
          <div className="text-[17px] pr-4">
            {selectedBlog?.description &&
              selectedBlog.description
                .split("\n")
                .map((paragraph, index) => <p key={index} className="pb-2">{paragraph}</p>)}
          </div>
          <div className="flex justify-end">
            <p className="text-textBlue font-semibold">
              {selectedBlog?.author}
            </p>
          </div>
          <div className="pt-5">
            <span className="text-textGrey text-2xl">Comments :</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
