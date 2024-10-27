import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SignUp() {

  const navigate=useNavigate();
  
  const [details, setdetails] = useState({
    name:"",
    email:"",
    password:"",
    location:""
  })

  const handleChange=(e)=>{
    setdetails({...details,[e.target.name]: e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${process.env.REACT_APP_API_URL}/api/users/`,{
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
      // console.log(data);
      toast.success("Signed Up Successfully")
      navigate('/')
    } catch (err) {
      // alert(error);
      // toast.error(error)
      toast.error(err.message || "An error occurred");
    }
  }

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <form className='w-50 m-auto' onSubmit={handleSubmit}>
          <div className='m-auto' style={{textAlign:'center'}}><h2 className='w-50' >SignUp Page</h2></div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={details.name} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={details.email} onChange={handleChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={details.password} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputLocation" className="form-label" >Address</label>
            <input type="text" className="form-control" name='location' value={details.location} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-success m-3">Submit</button>
          <Link to="/login" className="btn btn-warning m-3">Already a User?</Link>
        </form>
      </div>
    </>
  )
}
