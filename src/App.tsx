import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Day01TodoList } from "./projects/Day01TodoList";
import { Day02GithubCard } from "./projects/Day02GithubCard";
import { Home } from "./projects/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/day01",
    element: <Day01TodoList />,
  },
  {
    path: "/day02",
    element: <Day02GithubCard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
