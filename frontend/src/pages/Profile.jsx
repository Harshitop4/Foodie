import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState();
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    const navigate = useNavigate(); // For navigation

    const getOrders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }
            const data = await response.json();
            setOrders(data);

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const formatDateToIST = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    if (loading) return <div>Loading...</div>;

    return (<>
        <Navbar/>
        <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "2rem" }}>
            <h1 className='d-flex justify-content-center'>My Orders</h1>
            <hr />
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order._id} style={{ border: "1px solid #ddd", borderRadius: "8px", margin: "1rem 0", padding: "1rem" }}>
                        <h4>Order ID: {order._id}</h4>
                        <p>Total Items: {order.totalItems}</p>
                        <p>Total Price: Rs. {order.totalPrice}</p>
                        <p>Delivery Address: {order.deliveryAddress}</p>
                        <p>Mobile Number: {order.MobileNumber}</p>
                        <div className='d-flex'>
                            <button onClick={()=>navigate(`/order/${order._id}`)} style={{ backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "0.25rem", padding: "0.5rem", cursor: "pointer" }}>
                                View Order
                            </button>
                            <div className='ms-auto'>Ordered at: {formatDateToIST(order.orderedAt)}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
        </>
    );
}
