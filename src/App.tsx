import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Day01TodoList } from "./projects/Day01TodoList";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
