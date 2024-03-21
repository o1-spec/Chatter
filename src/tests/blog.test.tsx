import { render, screen } from "@testing-library/react";
import Blog from "../Components/pages/Blog";
import { PostContextValue } from "../App";
import { PostContext } from "../App";


const mockPostContext: PostContextValue = {
  handleLogout: jest.fn(),
  setActive: jest.fn(),
  setUser: jest.fn(),
  user: null,
  active: "",
  logout: false,
  overlay: false,
  setOverlay: jest.fn(),
  setLogOut: jest.fn(),
  logIn: false,
  setLogin: jest.fn(),
};

test("Should render Blog Component", () => {
  render(
    <PostContext.Provider value={mockPostContext}>
      <Blog PostContext={PostContext} />
    </PostContext.Provider>
  );
  const todoElement = screen.getByTestId("blog-1");
  expect(todoElement).toBeInTheDocument();
});
