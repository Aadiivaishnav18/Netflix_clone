import Login from './Login';
import Browse from './Browse';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Explore from './Explore';
import Hero from './Hero';


const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element : <Hero/>,
    },

    {
      path: "/browse",
      element: <Browse/>

    },

    {
      path : "/error",
      element: <Error />
    },

    {
      path : "/explore",
      element : <Explore />
    },

    {
      path: "login",
      element: <Login />
    }


  ]);


  return (
    <div>
 <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body