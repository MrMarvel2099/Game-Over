import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Poster from '../../Img/poster.jpeg'
import axios from "axios"
import Joi from 'joi'
import RegStyle from '../Register/Register.module.css'


export default function Register() {
    //Declearation
    let loginNavigate = useNavigate();
    const [errorList, seterrorList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        age: 0,
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
    async function sendRegisterData() {
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
        if (data.message === "success") {
            setLoading(false)
            loginNavigate("/login")
        } else {
            setError(data.message)
            setLoading(false)
            console.log(error);
        }
        console.log(data);
    }

    // submitting function
    function submitRegisterForm(e) {
        e.preventDefault();
        setLoading(true)
        let validation = validateRegisterForm();
        if (validation.error) {
            setLoading(false);
            seterrorList(validation.error.details)
        } else {
            sendRegisterData();
        }
    }

    //validation Function
    function validateRegisterForm() {
        let scheme = Joi.object({
            first_name: Joi.string().min(3).max(10).required(),
            last_name: Joi.string().min(3).max(10).required(),
            age: Joi.number().min(16).max(60).required(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(60).required(),
        });
        return scheme.validate(user, { abortEarly: false });
    }

    return <>
        <div className="container py-5 ">
            <div className={`${RegStyle.formStyle} row p-0`}>
                <div className={`${RegStyle.poster} + col-lg-6 `}>
                    {/* <img className='w-100 h-100' src={Poster} alt="GameOver_Poster" /> */}
                </div>
                <div className="col-lg-6">
                    <h2 className='text-center text-white my-4'>Create My Accout</h2>
                    <form onSubmit={submitRegisterForm} action="">
                        <div className="row">
                            <div className="col-md-6">
                                <input onChange={getUserData} placeholder='First Name' className='text-white bg-transparent form-control my-2 w-100' type="text" name="first_name" id="first_name" />
                            </div>
                            <div className="col-md-6">
                                <input onChange={getUserData} placeholder='Last Name' className='text-white bg-transparent form-control my-2 w-100' type="text" name="last_name" id="last_name" />
                            </div>
                        </div>
                        {errorList.filter((err) => err.context.label === 'first_name')[0] ?
                            <div className="alert py-0 my-2 alert-danger">
                                {errorList.filter((err) => err.context.label === 'first_name')[0]?.message}
                            </div>
                            : ""}
                        {errorList.filter((err) => err.context.label === 'last_name')[0] ?
                            <div className="alert py-0 my-2 alert-danger">
                                {errorList.filter((err) => err.context.label === 'last_name')[0]?.message}
                            </div>
                            : ""
                        }
                        <div className="d-flex flex-column">
                            <input onChange={getUserData} placeholder='Email' className='text-white bg-transparent form-control my-2 w-100' type="email" name="email" id="email" />
                            {errorList.filter((err) => err.context.label === 'email')[0] ?
                            <div className="alert py-0 my-2 alert-danger">
                                {errorList.filter((err) => err.context.label === 'email')[0]?.message}
                            </div>
                            : ""
                        }
                            <input onChange={getUserData} placeholder='Age' className='text-white bg-transparent form-control my-2 w-100' type="number" name="age" id="age" />
                            {errorList.filter((err) => err.context.label === 'age')[0] ?
                            <div className="alert py-0 my-2 alert-danger">
                                {errorList.filter((err) => err.context.label === 'age')[0]?.message}
                            </div>
                            : ""
                        }
                            <input onChange={getUserData} placeholder='Password' className='text-white bg-transparent form-control my-2 w-100' type="password" name="password" id="password" />
                            {/* {error.length > 0 ? <div className="alert py-0 alert-danger my-2">{error}</div> : ""} */}
                            {errorList.map((err, index) => err.context.label === 'password' ?
                                <div key={index} className="alert py-0 alert-danger my-2">Invalid Password</div>
                                :
                                ""
                            )}
                            <button type='submit' className='btn btn-secondary'>
                                {loading === true ? <i className='fas fa-spinner fa-spin'></i> : "Create Account"}
                            </button>
                            <p className='text-center text-secondary my-2'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                            <i className='text-white'><hr /></i>
                            <p className='text-center text-secondary'>Already a member? <span>
                                <Link rel="stylesheet" to="../login">Log In </Link>
                            </span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
