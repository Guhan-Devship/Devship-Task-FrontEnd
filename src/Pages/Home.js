import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    let navigate =useNavigate()
    let handleLogout = () => {
        window.localStorage.removeItem('myapptoken');
        navigate('/');
      };
      
      function fetchData() {
        if (!localStorage.getItem("myapptoken")) {
            navigate("/");
        }
    }
    useEffect(() => {
        fetchData()
    })
  return (
    <>
    <div className='container'>
        <button className='btn btn-sm btn-danger mt-5' onClick={handleLogout}>Logout</button>
        <div className='text-center'>
            <h1>Hi </h1>
        </div>
    </div>
    </>
  )
}

export default Home