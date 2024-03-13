import { ToastContainer } from "react-toastify";
import { useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "aos/dist/aos.css";
import Aos from "aos";

//import { Suspense, lazy } from "react";

import Homepage from "./Components/pages/Homepage";
import LoginPage from "./Components/pages/LoginPage";
import Signup from "./Components/pages/Signup";
import Confirmation from "./Components/pages/Confirmation";
import Blog from "./Components/pages/Blog";
import Feed from "./Components/BlogPages/Feed";
import Bookmark from "./Components/BlogPages/Bookmark";
import TeamBlogs from "./Components/BlogPages/TeamBlogs";
import Drafts from "./Components/BlogPages/Drafts";
import Analytics from "./Components/BlogPages/Analytics";
import Account from "./Components/BlogPages/Personal/Account";
import Notification from "./Components/BlogPages/Personal/Notification";
import Programming from "./Components/BlogPages/Trending/Programming";
import DataScience from "./Components/BlogPages/Trending/DataScience";
import Technology from "./Components/BlogPages/Trending/Technology";
import MachineLearning from "./Components/BlogPages/Trending/MachineLearning";
import Politics from "./Components/BlogPages/Trending/Politics";
import See from "./Components/BlogPages/Trending/See";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Logout from "./Components/BlogPages/Personal/Logout";
import PostBlog from "./Components/utilities/PostBlog";
import BlogSection from "./Components/BlogPages/BlogSection";

const PostContext = createContext();

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const [logOut, setLogOut] = useState(false);
  const [logIn, setLogin] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
    });
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <BrowserRouter>
      <PostContext.Provider
        value={{
          handleLogout,
          setActive,
          setUser,
          user,
          active,
          Logout,
          setLogOut,
          logIn,
          setLogin,
        }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage PostContext={PostContext} />} />
          <Route
            path="/login"
            element={
              <LoginPage
                PostContext={PostContext}
                setActive={setActive}
                setUser={setUser}
              />
            }
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/blog" element={<Blog PostContext={PostContext} />}>
            <Route path="/blog/feed" element={<Feed />} />
            <Route path="/blog/bookmark" element={<Bookmark />} />
            <Route
              path="/blog/teamBlogs"
              element={<TeamBlogs user={user} setActive={setActive} />}
            />
            <Route path="/blog/drafts" element={<Drafts />} />
            <Route path="/blog/analytics" element={<Analytics />} />
            <Route path="/blog/programming" element={<Programming />} />
            <Route path="/blog/dataScience" element={<DataScience />} />
            <Route path="/blog/technology" element={<Technology />} />
            <Route path="/blog/machineLearning" element={<MachineLearning />} />
            <Route path="/blog/politics" element={<Politics />} />
            <Route path="/blog/all" element={<See />} />
            <Route
              path="/blog/account"
              element={<Account PostContext={PostContext} />}
            />
            <Route path="/blog/notification" element={<Notification />} />
            <Route path="/blog/blogSection/:id" element={<BlogSection />} />
            <Route
              path="/blog/updateBlog/:id"
              element={<PostBlog user={user} setActive={setActive} />}
            />
            <Route
              path="/blog/postBlog"
              element={<PostBlog user={user} setActive={setActive} />}
            />
            <Route
              path="/blog/logout"
              element={<Logout PostContext={PostContext} />}
            />
          </Route>
        </Routes>
      </PostContext.Provider>
    </BrowserRouter>
  );
}

export default App;
