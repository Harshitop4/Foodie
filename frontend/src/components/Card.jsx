import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { useGlobal } from '../pages/GlobalContext';

export default function Card(props) {
    const { ind, title,img, category, description, options: { half, medium, full }} = props;
    const [qt, setQt] = useState(1);
    const [size, setSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('authToken'))
    const {noCartItems,setNoCartItems}=useGlobal();

    const navigate = useNavigate();

    useEffect(() => {
        setTotal(qt * size);
    }, [qt, size]);

    const handleAddCart = async () => {
        if(!token){
            navigate('/login')
            return;
        }
        if(total===0){
            // alert('Please Select Valid Size')
            toast.warning('Please Select Valid Size')
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ ind, qt, price: size }),
            });
            if (!res.ok) {
                const errmsg = await res.text();
                throw new Error(errmsg);
            }
            setNoCartItems(noCartItems+qt);
            toast.success("Item Added To The Cart")
        } catch (err) {
            // alert(err);
            // toast.error(err)
            toast.error(err.message || "An error occurred");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="card m-4" style={{ width: "18rem", borderRadius: "1rem", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#fffaf0" }}>
                <img src={img} className="card-img-top" alt="Food Item" style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", height: "12rem", objectFit: "cover" }} />
                <div className="card-body" style={{ padding: "1.5rem" }}>
                    <h5 className="card-title" style={{ fontWeight: "bold", color: "#5a2d82" }}>{title}</h5>
                    <p className="card-text" style={{color: "black",overflow: "hidden",textOverflow: "ellipsis",display: "-webkit-box",WebkitLineClamp: 2,WebkitBoxOrient: "vertical",maxHeight: "3rem"}}>{description}</p>
                    <div className='container w-100 d-flex justify-content-between align-items-center' style={{ marginBottom: "1rem" }}>
                        <select className='form-select form-select-sm me-2' value={qt} onChange={(e) => setQt(Number(e.target.value))} style={{ width: "45%", backgroundColor: "#ffebc9", borderColor: "#f5b942", color: "#5a2d82" }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <select className='form-select form-select-sm' value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ width: "45%", backgroundColor: "#ffebc9", borderColor: "#f5b942", color: "#5a2d82" }}>
                            <option value={0} disabled>Select size</option>
                            <option value={half}>Half: Rs.{half}</option>
                            <option value={medium}>Medium: Rs.{medium}</option>
                            <option value={full}>Full: Rs.{full}</option>
                        </select>
                    </div>
                    <p style={{ fontWeight: "bold", color: "#5a2d82" }}>Total Price: Rs. {total}</p>
                    <button className="btn btn-success w-100" onClick={handleAddCart} style={{ backgroundColor: "#4CAF50", borderRadius: "0.5rem", fontWeight: "bold", color: "white" }}>
                        Add to Cart 
                    <img src="/images/cart.png" alt="Cart Icon" style={{ width: "1rem", marginLeft: "0.5rem" }} />
                    </button>
                </div>
            </div>
        </div>
    );
}