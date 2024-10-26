import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link,useNavigate } from 'react-router-dom'


export default function Login() {

  const navigate=useNavigate();

  const [details, setdetails] = useState({
    email:"",
    password:"",
  })

  const handleChange=(e)=>{
    setdetails({...details,[e.target.name]: e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(details)
      })
      if(!response.ok){
        const errmsg=await response.text();
        throw new Error(errmsg);
      }
      const data=await response.json();
      console.log("Logged in Successfully");
      localStorage.setItem("authToken",data.authToken)
      navigate('/')
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <form className='w-50 m-auto' onSubmit={handleSubmit}>
          <div className='m-auto' style={{textAlign:'center'}}><h2 className='w-50' >Login Page</h2></div>
          <div className="mb-3 mt-4">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={details.email} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={details.password} onChange={handleChange}/>
          </div>
          
          <button type="submit" className="btn btn-success m-3">Submit</button>
          <Link to="/signup" className="btn btn-warning m-3">New User?</Link>
        </form>
      </div>
    </>
  )
}
