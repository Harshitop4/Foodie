import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

export default function OrderDetails() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const { orderId } = useParams();

    const getOrders = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/orders/${orderId}`, {
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
            setOrders(data)

        } catch (err) {
            // alert(error);
            // toast.error(error)
            toast.error(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div>
        <Navbar/>
        { !loading ? 
            <>
            <div style={{ maxWidth: "50rem", margin: "2rem auto" }}>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} style={{ display: "flex", maxWidth: "50rem", border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
                            <div style={{ width:"7rem",height:"7rem",margin: "0 5rem"}}>
                                <img src={`/${order.img}`} style={{ borderRadius:"20%",width: "100%",height:"100%",objectFit:"cover" }} alt="" srcset="" />
                            </div>
                            <div>
                                <h1 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>Name: {order.name}</h1>
                                <h2 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>Quantity: {order.qt}</h2>
                                <h2 style={{ fontSize: "1rem", color: "#333" }}>Price: Rs. {order.price}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>No order details found.</h2>
                )}
            </div>
            </> 
            : <h1>Loading...</h1>
        }
        </div> 
    );

}
