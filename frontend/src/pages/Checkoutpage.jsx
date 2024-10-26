import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  
  const [cartItems, setCartItems] = useState([])
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderDetails, setOrderDetails] = useState({
    name:"",
    mobno:"",
    deliveryAdd:""
  })

  const navigate=useNavigate();

  const getCartItems=async()=>{
    try {
      setLoading(true)
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

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': token,
        },
        body:JSON.stringify(orderDetails)
      })
      if (!res.ok) {
        const errmsg = await res.text();
        throw new Error(errmsg);
      }
      const data = await res.json();
      alert("Order Placed Successfully")
      setLoading(false)
      navigate('/')

    } catch (err) {
      alert(err);
      console.log(err);
    }
    
  }

  useEffect(()=>{
    getCartItems();
  },[])

  useEffect(()=>{
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qt), 0);
    setTotalPrice(total);
  },[cartItems])

  return (
    <div style={{maxWidth: "50rem", margin: "0 auto", padding: "2rem" }}>
      <h1 className='d-flex justify-content-center'>Checkout</h1>
      <hr />
      {/* Order Summary */}
      <div style={{ borderBottom: "0.1rem solid #ddd", paddingBottom: "2rem", marginBottom: "2rem" }}>
        <h3>Order Summary/-</h3>
        <h4 style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Name</span>
            <span>Price</span>
            <span>Total</span>
          </h4>
        {cartItems.map(item => (
          <>
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{width:"6rem"}}>{item.name}</span>
            <span>Rs. {item.price} x {item.qt}</span>
            <span>Rs. {item.price * item.qt}</span>
          </div>
            <hr />
            </>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total:</span>
          <span>Rs. {totalPrice}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div>
        <h3>Payment Details</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Name</label>
            <input type="text" name='name' value={orderDetails.name} onChange={(e)=>setOrderDetails({...orderDetails,[e.target.name]:e.target.value})} placeholder="" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Mobile Number</label>
            <input type="text" name='mobno' value={orderDetails.mobno} onChange={(e)=>setOrderDetails({...orderDetails,[e.target.name]:e.target.value})} placeholder="" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Delivery Address</label>
            <input type="text" name='deliveryAdd' value={orderDetails.deliveryAdd} onChange={(e)=>setOrderDetails({...orderDetails,[e.target.name]:e.target.value})} placeholder="" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          </div>
          <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "0.25rem", fontSize: "1rem", cursor: "pointer" }}>
            Pay Rs. {totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
}
