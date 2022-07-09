import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MobileCart from './MobileCart'
import Navbar from './Navbar'

function Search() {
    const location = useLocation();
    console.log(location)
  const [destination, setDestination] = useState(location.state.destination);
    const [product, setProduct] = useState([])
    let getdata = async () => {
        const { data } = await axios.get(`http://localhost:8080/getallProduct?model=${destination}`,{
            headers: {
              Authorization: window.localStorage.getItem('myapptoken'),
            },
          });
        setProduct(data);
    }

    useEffect(() => {
        getdata();
    }, [])
    return (
        <div>
            <Navbar />
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {product.map((card) => {
                            return <MobileCart productData={card} />
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search