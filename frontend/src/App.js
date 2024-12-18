import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Checkoutpage from './pages/Checkoutpage';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/cart/checkout",
    element: <Checkoutpage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/order/:orderId",
    element: <OrderDetails />,
  },
  {
    path: "*",
    element: <h2>Page Not Found!</h2>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false} />
    </> 
  );
}

export default App;
