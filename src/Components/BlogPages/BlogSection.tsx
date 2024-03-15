import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  collection,
  Timestamp,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from "../utilities/Spinner";
import Comments from "../utilities/Comments";
import { JSX } from "react/jsx-runtime";
import CommentBox from "../utilities/CommentBox";
import { toast } from "react-toastify";

function BlogSection({ PostContext }) {
  const { user } = useContext(PostContext);
  //console.log(user)
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  let [likes, setLikes] = useState([]);

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

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });

    toast.success("Comment Posted Successfully", {});
    await updateDoc(doc(db, "blogs", id), {
      ...selectedBlog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-8 px-3">
      <div className="flex flex-col gap-10 md:mx-32 mx-2">
        <img
          className="md:w-[750px] w-fit md:h-[430px] h-[330px]"
          src={selectedBlog?.imgUrl || selectedBlog?.imageUrl}
          alt={selectedBlog?.title}
        />
        <div>
          <h5 className="md:text-4xl text-[25px] font-semibold pb-2 leading-8 md:leading-0">
            {selectedBlog?.title}
          </h5>
          <div className="flex flex-col sm:flex-row smitems-center items-start gap-2 pb-4">
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
              selectedBlog.description.split("\n").map((paragraph, index) => (
                <p key={index} className="pb-2">
                  {paragraph}
                </p>
              ))}
          </div>
          <div className="flex justify-end">
            <p className="text-textBlue font-semibold">
              {selectedBlog?.author}
            </p>
          </div>
          <div className="pt-5">
            <span className="text-textGrey text-2xl">Comments :</span>
            <p>{selectedBlog?.commments?.length} &nbsp; comments</p>
            {selectedBlog?.comments?.length === 0 ? (
              <Comments
                msg={"No comments yet posted, Be the first to comment"}
              />
            ) : (
              <>
                {selectedBlog?.comments.map(
                  (comment: JSX.IntrinsicAttributes) => (
                    <Comments comment={comment} user={user} />
                  )
                )}
              </>
            )}
          </div>
          <CommentBox
            userComment={userComment}
            setUserComment={setUserComment}
            handleComment={handleComment}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
