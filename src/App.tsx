import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Components/pages/Homepage";
import LoginPage from "./Components/pages/LoginPage";
import Signup from "./Components/pages/Signup";
import Confirmation from "./Components/pages/Confirmation";
import Blog from "./Components/pages/Blog";

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
    element: <Blog/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
