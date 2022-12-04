import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Joi from 'joi'
import LoginStyle from './Login.module.css'
import Logo from "../../Img/logo-removebg-preview.png"


export default function Login({saveUserData}) {
    //Declearation
    let loginNavigate = useNavigate();
    const [errorList, seterrorList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // cloning userdata in new variable
    function getUserData(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        console.log(myUser);
    }

    // calling api
    async function sendLoginData() {
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user)
        if (data.message === "success") {
            setLoading(false)
            localStorage.setItem("userToken" , data.token)
            saveUserData()
            loginNavigate("/home")
        } else {
            setError(data.message)
            setLoading(false)
            console.log(error);
        }
        console.log(data);
    }

    // submitting function
    function submitLoginForm(e) {
        e.preventDefault();
        setLoading(true)
        let validation = validateLoginForm();
        if (validation.error) {
            setLoading(false);
            seterrorList(validation.error.details)
        } else {
            sendLoginData();
        }
    }

    //validation Function
    function validateLoginForm() {
        let scheme = Joi.object({
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(16).max(60).pattern(/[A-Z][a-z]{6,8}/).required(),
        });
        return scheme.validate(user, { abortEarly: false });
    }

    function forgetPassword(){
        window.alert("Please Create New Account")
    }

    return <>
        <div className="container py-5 ">
            <div className={`${LoginStyle.formStyle} row p-0 my-5`}>
                <div className={`${LoginStyle.poster} + col-lg-6 `}>
                    {/* <img className='w-100 h-100' src={Poster} alt="GameOver_Poster" /> */}
                </div>
                <div className="col-lg-6 text-center">
                            <img className="w-25" src={Logo} alt="GameOver Logo" />
                        <h2 className='text-center text-white my-4'>Log In to Game Over</h2>
                    <form onSubmit={submitLoginForm} action="">
                        <div className="d-flex flex-column">
                            <input onChange={getUserData} placeholder='Email' className='text-white bg-transparent form-control my-2 w-100' type="email" name="email" id="email" />
                            {errorList.filter((err) => err.context.label === 'email')[0] ?
                                <div className="alert py-0 my-2 alert-danger">
                                    {errorList.filter((err) => err.context.label === 'email')[0]?.message}
                                </div>
                                : ""
                            }
                            <input onChange={getUserData} placeholder='Password' className='text-white bg-transparent form-control my-2 w-100' type="password" name="password" id="password" />
                            {/* {error.length > 0 ? <div className="alert py-0 alert-danger my-2">{error}</div> : ""} */}
                            {errorList.map((err, index) => err.context.label === 'password' ?
                                <div key={index} className="alert py-0 alert-danger my-2">Password is not Valid</div>
                                :
                                ""
                            )}
                            <button type='submit' className='btn btn-secondary'>
                                {loading === true ? <i className='fas fa-spinner fa-spin'></i> : "Log In"}
                            </button>
                            <i className='text-white'><hr /></i>
                            <Link rel="stylesheet" onClick={forgetPassword} to="">Forgot Password?</Link>
                            <p className='text-center text-secondary'>Not yet a member? <span>
                                <Link rel="stylesheet" to="../register">Create Account</Link>
                            </span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
