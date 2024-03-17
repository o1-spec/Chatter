import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const HandleLike = async (blogId: string) => {
  const userId: string | undefined = auth.currentUser?.uid;
  const blogRef = doc(db, "blogs", blogId);
  try {
    const blogSnapshot = await getDoc(blogRef);
    const blogData = blogSnapshot.data();
    const currentLikes = blogData?.likes || [];

    if (currentLikes.includes(userId)) {
      return toast.error("You already liked this post!", {
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

    await updateDoc(blogRef, {
      likes: [...currentLikes, userId],
    });

    // Fetch the updated likes count from Firestore
    const updatedSnapshot = await getDoc(blogRef);
    const updatedData = updatedSnapshot.data();
    const updatedLikes = updatedData?.likes || [];

    // Update the local state with the updated likes count
    setTotalBlogs((prevBlogs) => {
      return prevBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, likes: updatedLikes };
        } else {
          return blog;
        }
      });
    });

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

export default HandleLike;
