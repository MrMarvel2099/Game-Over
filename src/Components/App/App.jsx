
import './App.css';
import React from 'react'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from '../Layout/Layout';
import Error from '../Error/Error';
import Home from '../Home/Home';
import Platforms from '../Platforms/Platforms';
import All from '../All/All';
import Register from '../Register/Register'
import Login from '../LogIn/Login';
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react';
import Details from '../Details/Details';
import SortBy from '../SortBy/SortBy';
import Categories from '../Categories/Categories';


export default function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserdata();
    }
  }, [])

  const [userData, setUserData] = useState(null);

  function saveUserdata() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken)
    console.log(userData);
  }



  // Navigation Bar
  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "all", element: <All /> },
        { path: "platforms/:platform", element: <Platforms /> },
        { path: "sort-by/:sorting", element: <SortBy /> },
        { path: "category/:categories", element: <Categories /> },
        { path: "login", element: <Login saveUserdata={saveUserdata} /> },
        { path: "register", element: <Register /> },
        { path: "details/:id", element: <Details /> },
        { path: '*', element: <Error /> }
      ]
    }
  ])


  return <>
    <RouterProvider router={routers} />
  </>
}


