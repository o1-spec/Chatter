/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastContainer } from "react-toastify";
import { useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "aos/dist/aos.css";
import Aos from "aos";

//import { Suspense, lazy } from "react";

import Homepage from "./Components/pages/Homepage";
import LoginPage from "./Components/pages/LoginPage";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./Components/BlogPages/Personal/Logout";
import PostBlog from "./Components/utilities/PostBlog";
import BlogSection from "./Components/BlogPages/BlogSection";
import React from "react";
import { User } from "firebase/auth";

export interface PostContextValue {
  handleLogout: () => void;
  setActive: (active: string) => void;
  setUser: (user: User) => void;
  user: User | null;
  active: string;
  logout: boolean;
  overlay: boolean;
  setOverlay: (overlay: boolean) => void;
  setLogOut: (logOut: boolean) => void;
  logIn: boolean;
  setLogin: (logIn: boolean) => void;
}

const initialPostContextValue: PostContextValue = {
  handleLogout: () => {},
  setActive: (_active: string) => {},
  setUser: (_user: User) => {},
  user: null,
  active: "",
  logout: false,
  overlay: false,
  setOverlay: (_overlay: boolean) => {},
  setLogOut: (_logOut: boolean) => {},
  logIn: false,
  setLogin: (_logIn: boolean) => {},
};

const PostContext = createContext<PostContextValue>(initialPostContextValue);

function App() {
  const [active, setActive] = React.useState<string>("home");
  const [user, setUser] = useState<User | null>(null);
  const [logout, setLogOut] = useState(false);
  const [logIn, setLogin] = useState(true);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  //console.log(user);

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
          logout,
          overlay,
          setOverlay,
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
            element={<LoginPage PostContext={PostContext} />}
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/blog" element={<Blog PostContext={PostContext} />}>
            <Route path="/blog/feed" element={<Feed />} />
            <Route path="/blog/bookmark" element={<Bookmark />} />
            <Route path="/blog/teamBlogs" element={<TeamBlogs user={user} />} />
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
            <Route
              path="/blog/blogSection/:id"
              element={<BlogSection PostContext={PostContext} />}
            />
            <Route
              path="/blog/updateBlog/:id"
              element={<PostBlog PostContext={PostContext} />}
            />
            <Route
              path="/blog/postBlog"
              element={<PostBlog PostContext={PostContext} />}
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
