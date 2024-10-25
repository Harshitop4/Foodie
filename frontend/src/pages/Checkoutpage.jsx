import React, { useState } from 'react';

export default function CheckoutPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Pizza", quantity: 2, price: 10 },
    { id: 2, name: "Pasta", quantity: 1, price: 8 },
  ]);
  
  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "2rem" }}>
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div style={{ borderBottom: "0.1rem solid #ddd", paddingBottom: "2rem", marginBottom: "2rem" }}>
        <h3>Order Summary</h3>
        {items.map(item => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>{item.name} x {item.quantity}</span>
            <span>Rs. {item.price * item.quantity}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total:</span>
          <span>Rs. {calculateTotal()}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div>
        <h3>Payment Details</h3>
        <form>
          <div style={{ marginBottom: "1rem" }}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="Name on Card" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ width: "48%" }}>
              <label>Expiration Date</label>
              <input type="text" placeholder="MM/YY" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
            </div>
            <div style={{ width: "48%" }}>
              <label>CVV</label>
              <input type="password" placeholder="123" required style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
            </div>
          </div>
          <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "0.25rem", fontSize: "1rem", cursor: "pointer" }}>
            Pay Rs. {calculateTotal()}
          </button>
        </form>
      </div>
    </div>
  );
}
