import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import Hero from "./Hero";
import { useMemo } from "react";
import Explore from "./Explore";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = useMemo (()=>
  
      createBrowserRouter([
    {
      path: "/",
      element: <Hero />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/browse",
      element: <Browse />,
    },

    {
      path: "/explore",
      element: <Explore />

    },

    {
      path: "/error",
      element: <Error />,
    },
  ]), []);
  
  

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
