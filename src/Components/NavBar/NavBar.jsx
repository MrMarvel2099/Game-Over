import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../Img/logo-removebg-preview.png"

export default function NavBar( logOut , userdata) {
    
    return <>
        <nav className="navbar navStyle navbar-dark navbar-expand-lg bg-dark position-fixed w-100">
            <div className="container">
                <Link className="navbar-brand d-flex w-25 px-0" to="home">
                    <div className="w-50">
                        <img className="w-50" src={Logo} alt="logo" />
                    </div>
                    <h4>GameOver</h4>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ps-5">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="all">All</Link>
                        </li>
                        {/* Platforms Dropdown List */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="platforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Platforms
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="platforms/pc">PC</Link></li>
                                <li><Link className="dropdown-item" to="platforms/browser">Browser</Link></li>
                            </ul>
                        </li>
                        {/* Sort-By Dropdown List */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="sort-by" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                sort-by
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="sort-by/release-date">Release Date</Link></li>
                                <li><Link className="dropdown-item" to="sort-by/popularity">Popularity</Link></li>
                                <li><Link className="dropdown-item" to="sort-by/alphabetical">Alphabetical</Link></li>
                                <li><Link className="dropdown-item" to="sort-by/relevance">Relevance</Link></li>
                            </ul>
                        </li>
                        {/* Category Dropdown List */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="category" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="category/action">Action</Link></li>
                                <li><Link className="dropdown-item" to="category/action-rpg">Action-RPG</Link></li>
                                <li><Link className="dropdown-item" to="category/battle-royal">Battle Royal</Link></li>
                                <li><Link className="dropdown-item" to="category/fantasy">Fantasy</Link></li>
                                <li><Link className="dropdown-item" to="category/fight">Fight</Link></li>
                                <li><Link className="dropdown-item" to="category/open-world">Open World</Link></li>
                                <li><Link className="dropdown-item" to="category/racing">Racing</Link></li>
                                <li><Link className="dropdown-item" to="category/shooter">Shooter</Link></li>
                                <li><Link className="dropdown-item" to="category/social">Social</Link></li>
                                <li><Link className="dropdown-item" to="category/sports">Sports</Link></li>
                                <li><Link className="dropdown-item" to="category/zombie">Zombies</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <button /*onClick={logOut}*/ className="btn btn-outline-primary">Log Out</button>
                    <>
                    <Link className='text-secondary text-decoration-none nav-item mx-2' to="login">Login</Link>
                    <Link className='text-secondary text-decoration-none nav-item mx-2' to="register">Register</Link>
                    </>
                </div>
            </div>
        </nav>
    </>
}
