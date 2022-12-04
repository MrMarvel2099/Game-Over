import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

export default function Layout(userData , setUserData) {
    let navigate = useNavigate();
    function logOut(){
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate("/login");
    }
    return (
        <div>
                <NavBar logOut={logOut} userData={userData} />
                <div className="">
            <div className="py-5">
                <Outlet></Outlet>
            </div>
            </div>
        </div>
    )
}
