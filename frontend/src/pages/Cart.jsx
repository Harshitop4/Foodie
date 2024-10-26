import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

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
      alert(err);
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
    } catch (err) {
      alert(err);
    }
  }

  const handleRemoveItem = async (id) => {
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
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    handleCart();
  }, [])

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qt), 0);
    setTotalPrice(total);
  }, [cartItems])

  return (
    <div>
      <Navbar />
      <div className="container mt-4" style={{maxWidth:"50rem"}}>
        {loading ?
          <h1>Loading...</h1>
          : <>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (<div>
              <p>Your cart is empty.</p>
              <button className='btn btn-warning' onClick={() => navigate('/')}>Go To Shopping</button></div>
            ) : (
              <div className='mb-4'>
                {cartItems.map((item, ind) => (
                  <div key={ind} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Quantity: {item.qt}</p>
                      <p className="card-text">Price: Rs.{item.price}</p>
                      <button className='btn btn-danger' onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
                <h4>Total Amount: Rs. {totalPrice}</h4>
                <button className="btn btn-primary mt-3" onClick={() => navigate('./checkout')}>Checkout</button>
                <button className="btn btn-danger mt-3 ms-4" onClick={handleClearCart}>Clear Cart</button>
              </div>
            )}
          </>
        }
      </div>
    </div>
  )
}
