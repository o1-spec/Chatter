import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
  {
    path: "/blog",
    element: <Blog />,
    children: [
      {
        path: "/blog/feed",
        element: <Feed />,
      },
      {
        path: "/blog/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/blog/teamBlogs",
        element: <TeamBlogs />,
      },
      {
        path: "/blog/drafts",
        element: <Drafts />,
      },
      {
        path: "/blog/analytics",
        element: <Analytics />,
      },
      {
        path: "/blog/programming",
        element: <Programming />,
      },
      {
        path: "/blog/dataScience",
        element: <DataScience />,
      },
      {
        path: "/blog/technology",
        element: <Technology />,
      },
      {
        path: "/blog/machineLearning",
        element: <MachineLearning />,
      },
      {
        path: "/blog/politics",
        element: <Politics />,
      },
      {
        path: "/blog/all",
        element: <See />,
      },
      {
        path: "/blog/account",
        element: <Account />,
      },
      {
        path: "/blog/notification",
        element: <Notification />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
