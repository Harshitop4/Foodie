import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import { toast } from 'react-toastify'
import { useGlobal } from './GlobalContext'

export default function Cart() {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const {noCartItems,setNoCartItems}=useGlobal();

  const navigate = useNavigate();

  const handleCart = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      })
      if (!res.ok) {
        const errmsg = await res.text();
        throw new Error(errmsg);
      }
      const data = await res.json();
      setCartItems(data);
      setLoading(false)

    } catch (err) {
      // alert(err);
      // toast.error(err)
      toast.error(err.message || "An error occurred");
    }
  }

  const handleClearCart = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      })
      if (!res.ok) {
        const errmsg = await res.text();
        throw new Error(errmsg);
      }
      handleCart();
      toast.success("Cart Cleared")
      setNoCartItems(0)
    } catch (err) {
      // alert(err);
      // toast.error(err)
      toast.error(err.message || "An error occurred");
    }
  }

  const handleRemoveItem = async (id,qt) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      })
      if (!res.ok) {
        const errmsg = await res.text();
        throw new Error(errmsg);
      }
      handleCart();
      toast.success("Item Removed")
      setNoCartItems(noCartItems-qt)
    } catch (err) {
      // alert(err);
      // toast.error(err)
      toast.error(err.message || "An error occurred");
    }
  }

  useEffect(() => {
    handleCart();
  }, [])

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qt), 0);
    setTotalPrice(parseFloat(total.toFixed(2)));
  }, [cartItems])

  return (
    <div>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "50rem" }}>
        {loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <h2 className="text-center mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <p>Your cart is empty.</p>
                <button className='btn btn-warning' onClick={() => navigate('/')}>Go To Shopping</button>
              </div>
            ) : (
              <div className='mb-4'>
                {cartItems.map((item, ind) => (
                  <div key={ind} className="card mb-3 shadow-sm cart-card">
                    <div className='d-flex align-items-center'>
                      <div className="p-2">
                        <img
                          src={item.img}
                          className="img-fluid rounded"
                          alt={item.name}
                          style={{ width: "8rem", height: "6rem", marginLeft: "1.5rem", marginRight: "5rem",objectFit:"cover" }}
                        />
                      </div>
                      <div className="card-body ms-2">
                        <h5 className="card-title mb-1" style={{ fontSize: "1.2rem" }}>{item.name}</h5>
                        <p className="card-text mb-1">Quantity: {item.qt}</p>
                        <p className="card-text mb-2">Price: Rs.{item.price}</p>
                      </div>
                      <div style={{marginRight:"3rem"}}>
                        <button className='btn btn-danger' onClick={() => handleRemoveItem(item.id,item.qt)}>
                          <i className="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <h4 >Total Amount: <span style={{backgroundColor:"#43ff49"}}>Rs. {totalPrice}</span></h4>
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-primary" onClick={() => navigate('./checkout')}>Checkout</button>
                  <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
