import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGlobal } from './GlobalContext'

export default function Home() {

  const {noCartItems,setNoCartItems}=useGlobal();
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [searchVar, setSearchVar] = useState("")
  const [selectedCat, setSelectedCat] = useState(-1)
  const [foodsList, setfoodsList] = useState([])
  const [token, setToken] = useState(localStorage.getItem('authToken'))

  const navigate = useNavigate();

  const getFoods = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/foods`)
      if (!response.ok) {
        const errmsg = await response.text();
        throw new Error(errmsg);
      }
      const data = await response.json();
      setFoods(data.foods);
      setCategories(data.categories);
      setLoading(false)
    } catch (err) {
      // alert(error);
      // toast.error(error)
      toast.error(err.message || "An error occurred");
    }
    
  }

  const getTotalItems = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/totalItems`, {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      })
      if (!response.ok) {
        const errmsg = await response.text();
        throw new Error(errmsg);
      }
      const data = await response.json();
      // console.log(data.totalItems)
      setNoCartItems(data.totalItems)
    } catch (err) {
      // alert(error);
      // toast.error(error)
      toast.error(err.message || "An error occurred");
    }
  }


  const getRequiredFoods = () => {
    const updatedFoodList =
      categories.map((cat, ind) => {
        let temp = 0;
        foods.forEach((food) => {
          if (food.category === cat.category && food.name.toLowerCase().includes(searchVar.toLowerCase()) && (selectedCat === -1 || ind === selectedCat)) {
            // temp.push(food)
            // console.log(food)
            temp += 1;
          }
        })
        return temp;
      })
    setfoodsList(updatedFoodList);
  }

  const toggle = (ind) => {
    if (selectedCat === ind) {
      return -1;
    }
    return ind;
  }

  useEffect(() => {
    getFoods();
    getRequiredFoods();
    getTotalItems();
  }, [])

  useEffect(() => {
    getRequiredFoods();
  }, [foods, categories, searchVar, selectedCat])

  return (
    <>
      <Navbar />
      <div style={{ padding: "0 2rem" }}>
        <div>
          <div className="d-flex w-50 m-auto mt-4" role="search" >
            <input className="form-control me-2 " type="search" value={searchVar} onChange={(e) => setSearchVar(e.target.value)} placeholder="Search" aria-label="Search" />
            <div className="btn btn-success">Search</div>
          </div>
        </div>
        <hr />
        { loading ? <div className='d-flex justify-content-center align-items-center fs-1' style={{height:"50vh"}}>Loading...</div> 
          : <>
          <div className='container d-flex justify-content-center'>
            {categories.map((cat, ind) => {
              return <button onClick={() => setSelectedCat(toggle(ind))} className='mx-2' style={{
                border: `2px solid ${(selectedCat === ind) ? "blue" : "red"}`, width: "10rem", height: "3rem",
                
                backgroundColor: (selectedCat === ind) ? "#352bd1" : "rgb(255 208 67)", borderRadius: "50px", fontStyle: "italic",boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.3)"
              }}>
                <h2 style={{ fontSize: "2rem",color: (selectedCat === ind) ? "rgb(255 208 67)" : "black", }}>{cat.category}</h2>
              </button>
            })}
          </div>
          <div>
            <div >
              {
                categories.map((cat, ind) => {
                  if (foodsList[ind] === 0) {
                    return ""
                  }
                  return <div key={ind} id={ind} style={{ border: "2px solid black", borderRadius: '8px', marginTop: "20px" }}>
                    <div className='mt-3 mb-3 fs-3' style={{ fontWeight: "bold", marginLeft: "2%" }}>{cat.category}</div>
                    <hr />
                    <div className='d-flex justify-content-centre flex-wrap'>
                      {foods.map((food, key) => {
                        if (food.category === cat.category && food.name.toLowerCase().includes(searchVar.toLowerCase())) {
                          return <div key={key}>
                            <Card ind={key} title={food.name} img={food.image} category={food.category} description={food.description} options={food.options} />
                          </div>
                        }
                      })}
                    </div>
                  </div>
                })
              }
            </div>
          </div></>
          }
      </div>
      { token?
        <button onClick={() => navigate('/cart')} style={{ width: "6rem", height: "5rem", position: "sticky", bottom: "7vh", left: "87vw", border: '2px solid red', backgroundColor: "#c1c1ff", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center",boxShadow: "-4px 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <img src="/images/cart.png" alt="Cart" style={{ width: "4rem", height: "4rem" }} />
          <div style={{
            position: "absolute", top: "0", right: "0", backgroundColor: "red", color: "white", borderRadius: "50%", width: "1.5rem", height: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8rem", fontWeight: "bold", transform: "translate(25%, -25%)"
          }}>
            {noCartItems}
          </div>
        </button>
        :""
      }
    </>
  )
}
