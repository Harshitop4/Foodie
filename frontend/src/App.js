import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Checkoutpage from './pages/Checkoutpage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/signup",
    element:<SignUp/>,
  },
  {
    path: "/cart",
    element:<Cart/>,
  },
  {
    path: "/cart/checkout",
    element:<Checkoutpage/>,
  },
  {
    path: "*",
    element: <h2>Page Not Found!</h2>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
