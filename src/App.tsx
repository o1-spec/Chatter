import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Components/pages/Homepage";
import LoginPage from "./Components/pages/LoginPage";
import Signup from "./Components/pages/Signup";
import Confirmation from "./Components/pages/Confirmation";

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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
