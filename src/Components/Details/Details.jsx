import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function Details() {

    const [gameDetails, setgameDetails] = useState([]);
    let allParams = useParams()
    console.log(allParams);


    useEffect(() => {
        getGameDetails()
    }, [])

    async function getGameDetails() {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: { id: allParams.id },
            headers: {
                'X-RapidAPI-Key': '3e612f0074msh6c309cdc83ca45ep15be2djsnd8558566352c',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, options);
        let details = data;
        setgameDetails(details);
        console.log(details);
    }


    return <>
        <section className='container py-5'>
            <div className="row">
                <div className="col-md-4">
                    <img src={gameDetails.thumbnail} className='w-100' alt={gameDetails.title} />
                    <button className='w-100 my-2 btn btn-info'>
                        <Link>Play Now <span><i className="fa-solid fa-right-to-bracket"></i></span></Link>
                    </button>
                </div>
                <div className="col-md-8">
                    <h2 className='pb-2 fw-bolder'>{gameDetails.title}</h2>
                    <h5 className='pb-3'>About {gameDetails.title}</h5>
                    <p>{gameDetails.description}</p>
                    {gameDetails.platform === "Windows" ?
                        <><h3 className='fw-bold my-5'>Minimum System Requirements</h3>
                            <h5 className='h6'><span className='fw-bold'>Graphic: </span>{gameDetails.minimum_system_requirements.graphics}</h5>
                            <h5 className='h6'><span className='fw-bold'>Memory: </span>{gameDetails.minimum_system_requirements.memory}</h5>
                            <h5 className='h6'><span className='fw-bold'>OS: </span>{gameDetails.minimum_system_requirements.os}</h5>
                            <h5 className='h6'><span className='fw-bold'>Processor: </span>{gameDetails.minimum_system_requirements.processor}</h5>
                            <h5 className='h6'><span className='fw-bold'>Storage: </span>{gameDetails.minimum_system_requirements.storage}</h5>
                        </> : ""
                    }
                    <h3 className='my-5 fw-bold'><span>{gameDetails.title}</span> Screenshots</h3>
                    { gameDetails.screenshots !== undefined ?
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={gameDetails.screenshots[0].image} className="d-block w-100" alt={gameDetails.screenshots[0].id} />
                                </div>
                                <div className="carousel-item">
                                    <img src={gameDetails.screenshots[1].image} className="d-block w-100" alt={gameDetails.screenshots[1].id} />
                                </div>
                                <div className="carousel-item">
                                    <img src={gameDetails.screenshots[2].image} className="d-block w-100" alt={gameDetails.screenshots[2].id} />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        : ""
                }

                    <h3 className='my-5 fw-bold'>Additional Information</h3>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Title</h6>
                            <p>{gameDetails.title}</p>
                        </div>
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Developer</h6>
                            <p>{gameDetails.developer}</p>
                        </div>
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Publisher</h6>
                            <p>{gameDetails.publisher}</p>
                        </div>
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Release Date</h6>
                            <p>{gameDetails.release_date}</p>
                        </div>
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Genre</h6>
                            <p>{gameDetails.genre}</p>
                        </div>
                        <div className="col-md-6 col-lg-4 d-flex flex-column">
                            <h6 className='fw-bold'>Platform</h6>
                            <p>{gameDetails.platform}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

}
