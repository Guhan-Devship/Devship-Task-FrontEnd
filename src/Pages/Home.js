import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import sale from '../images/sale.png'
import mobile from '../images/mobile.png'
import shopping from '../images/shopping.png'
import shoe from '../images/shoe.png'
import HomeCard from './HomeCard';
import axios from 'axios';

function Home() {
  let navigate = useNavigate()
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  const [product, setProduct] = useState([])
  let getdata = async () => {
    const { data } = await axios.get("http://localhost:8080/getall");
    setProduct(data);
  }

  useEffect(() => {
    fetchData()
    getdata()
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <div className="conatiner-fluid">
        <div className="row shop-card">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <img className="img-fluid sale-img" src={sale} />
            <img className="img-fluid shop-img" src={shopping} />
          </div>
          {
            product.map((category)=>{
              return <HomeCard category={category}/>
            })
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home