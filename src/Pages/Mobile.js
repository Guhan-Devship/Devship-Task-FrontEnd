import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CartItem from './CartItem';
import MobileCart from './MobileCart';
import Navbar from './Navbar'

function Mobile() {
    let params = useParams()
    let navigate = useNavigate()
    const [destination, setDestination] = useState("");
    const [product, setProduct] = useState([])
    let getdata = async () => {
        const { data } = await axios.get(`http://localhost:8080/getallProduct?category=${params.id}`, {
            headers: {
                Authorization: window.localStorage.getItem('myapptoken'),
            },
        });
        setProduct(data);
    }

    useEffect(() => {
        getdata();
    }, [])

    const handleSearch = () => {
        navigate("/search", { state: { destination } });
    };

    const [cartitems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)

    let handleCart = (item) => {
        console.log(item.offerPrice)
        console.log(total)
        setCartItems([...cartitems, item]);
        setTotal(total + item.offerPrice);
    }
    let handleRemoveCart = (item) => {
        let itemIndex = cartitems.findIndex(obj => item.id === obj.id)
        cartitems.splice(itemIndex, 1);
        setCartItems([...cartitems])
        setTotal(total - item.price)
    }
    return (
        <div>
            <Navbar cartitems={[cartitems]} />
            <form class="text-center form-inline mx-5 mt-2">
                <input class="form-control mr-sm-2" type="search" onChange={(e) => setDestination((e.target.value.toLowerCase()))} placeholder="Search" aria-label="Search" />
                <br />
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch} type="submit">Search</button>
            </form>
            <div>
                <ol class="list-group list-group-numbered">
                    {
                        cartitems.map((item) => {
                            return <li><CartItem item={item} handleRemoveCart={handleRemoveCart} /></li>
                        })
                    }
                </ol>
                {/* total of the cart */}
                {
                    cartitems.length > 0 ? <div>
                        <h1 className='col-lg-12 text-center'>Total: $ {total}</h1>
                    </div> : <div>
                        <h1 className='col-lg-12 text-center'>No Item in Cart</h1>
                    </div>
                }
            </div>
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {product.map((card) => {
                            return <MobileCart productData={card} handleCart={handleCart} />
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Mobile