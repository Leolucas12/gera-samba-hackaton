import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/register";
import Chat from "./pages/chat/chat";
import List from "./pages/list/list";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/chat/:id",
      element: <Chat />,
    },
    {
      path: "/list",
      element: <List />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
