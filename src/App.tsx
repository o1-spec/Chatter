import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Homepage from "./Components/pages/Homepage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
