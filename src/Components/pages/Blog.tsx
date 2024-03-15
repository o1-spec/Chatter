import { useContext, useState, useEffect } from "react";
import BlogHead from "../BlogPages/BlogHead";
import BlogNav from "../BlogPages/BlogNav";
import { Outlet } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { PostContextValue } from "../../App";
import { TrendingInterface } from "../BlogPages/Trending/TrendingInterface";
import Spinner from "../utilities/Spinner";
import SearchResult from "../utilities/SearchResult";

interface LogoutProps {
  PostContext: React.Context<PostContextValue>;
}

function Blog({ PostContext }: LogoutProps) {
  const { user } = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  const [filteredBlog, setFilteredBlog] = useState<TrendingInterface[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<TrendingInterface[]>([]);
  const [blogNav, setBlogNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
        //const querySnapshot = await getDocs(collection(db, "blogs"));
        //const documentsData = querySnapshot.docs.map((doc) => doc.data());
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
  const handleSearch = (searchTerm: string) => {
    // Filter blogs based on search term
    const filteredBlogs: TrendingInterface[] = totalBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Set filtered blogs to state or do whatever you want with the filtered blogs
    //console.log(filteredBlogs);
    setFilteredBlog(filteredBlogs);
  };

  console.log(filteredBlog);
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  console.log(totalBlogs);

  return (
    <div className="font-dmSans w-full h-full">
      <div
        className={
          blogNav === false
            ? "overlay absolute transition-all duration-300 hidden top-0 left-0 bottom-0 right-0 w-full h-full z-20"
            : "overlay absolute transition-all duration-300 top-0 left-0 bottom-0 right-0 w-full h-[140%] z-20"
        }
        onClick={() => setBlogNav(false)}
      ></div>
      <div className="flex h-full">
        <BlogNav blogNav={blogNav} setBlogNav={setBlogNav}  setSearchOpen={setSearchOpen}/>
        <div className="w-[100vw] md:pl-[16%] overflow-hidden">
          <BlogHead
            handleSearch={handleSearch}
            setSearchOpen={setSearchOpen}
            setBlogNav={setBlogNav}
            user={user}
          />
          <div className=" h-screen overflow-scroll scroll">
            {!searchOpen ? (
              <Outlet />
            ) : (
              <SearchResult filteredBlog={filteredBlog} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
