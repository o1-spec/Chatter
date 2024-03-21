import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  collection,
  Timestamp,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Comment } from "./CommentInterface";
import { db } from "../../firebase";
import Spinner from "../utilities/Spinner";
import Comments from "../utilities/Comments";
import CommentBox from "../utilities/CommentBox";
import { toast } from "react-toastify";
import { PostContextValue } from "../../App";
import { TrendingInterface } from "./Trending/TrendingInterface";

interface BlogSectionProp {
  PostContext: React.Context<PostContextValue>;
}

function BlogSection({ PostContext }: BlogSectionProp) {
  const { user } = useContext(PostContext);
  const { id } = useParams();
  //console.log(user)
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<TrendingInterface[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<TrendingInterface | null>(
    null
  );

  /*useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list: TrendingInterface[] = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as TrendingInterface);
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
*/

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

  console.log(blogs);
  useEffect(() => {
    if (blogs.length > 0) {
      const foundBlog: TrendingInterface | undefined = blogs.find(
        (blog) => blog.id === id
      );
      setSelectedBlog(foundBlog!);
    }
  }, [blogs, id]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    try {
      if (!id) {
        return;
      }
      const docRef = doc(db, "blogs", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const blogData = snapshot.data();
        setComments(blogData?.comments || []);
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  console.log(selectedBlog);

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBlog) return;
    const newComment: Comment = {
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    };
    const updatedComments: Comment[] = [...comments, newComment];
    toast.success("Comment Posted Successfully", {});
    if (id) {
      await updateDoc(doc(db, "blogs", id), {
        comments: updatedComments,
        timestamp: serverTimestamp(),
      });
    } else {
      console.error("Error: Document ID is undefined");
    }
    setComments(updatedComments);
    setUserComment("");
  };

  console.log(selectedBlog);
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
            {/*
            {selectedBlog?.timestamp ? (
              <span>{selectedBlog?.timestamp?.toDateString()}</span>
            ) : (
              <span>{selectedBlog?.createdAt?.toDateString()}</span>
            )}*/}
          </div>
          <div className="text-[17px] pr-4">
            {selectedBlog?.description &&
              selectedBlog?.description.split("\n").map((paragraph, index) => (
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
          <div className="pt-12">
            <span className="text-textGrey text-2xl pb-1">Comments :</span>
            <p className="text-lg my-3 pb-3 pt-2 bg-textBlue text-textWhite px-2 rounded-md w-fit">
              {selectedBlog?.comments?.length} comments
            </p>
            {selectedBlog?.comments?.length === 0 ? (
              <p>No comments yet on this blog, Be the first to comment</p>
            ) : (
              <>
                {selectedBlog?.comments?.map((comment) => (
                  <Comments comment={comment} />
                ))}
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
