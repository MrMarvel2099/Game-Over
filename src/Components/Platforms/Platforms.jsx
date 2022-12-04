import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Platforms() {

    let params = useParams();
    console.log(params);
    const [platfromGames, setplatfromGames] = useState([]);
    async function getPlatform() {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            params: { platform: params.platform },
            headers: {
                'X-RapidAPI-Key': '3e612f0074msh6c309cdc83ca45ep15be2djsnd8558566352c',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`,options);
        let gamesByPlatform = data;
        setplatfromGames(gamesByPlatform);
        console.log(gamesByPlatform);
    }

    useEffect(()=>{
        getPlatform()
    },[params])

    return <>
        <section className='container my-5'>
            <div className="d-flex jsutify-content-center align-items-center">
                <div className="row g-3">
                    {platfromGames.map((game, index) =>
                        <>
                            <div className="col-lg-3" key={index}>
                                <Link to={`/details/${game.id}`} className='text-secondary text-decoration-none'>
                                    <div className="card homecard w-100">
                                        <img src={game.thumbnail} className="card-img-top" alt={game.title} />
                                        <div className="card-body position-relative">
                                            <h3 className='h5 fw-bold py-2'>{game.title.split("").splice(0,15).join("")}</h3><span className=" position-absolute end-0 top-0 h4 badge bg-info">Free</span>
                                            <p>{game.short_description.split("").splice(0,25).join("")} ...</p>
                                            <div className='d-flex justify-content-between -align-items-center'>
                                                <i className="fa-solid fa-square-plus"></i>
                                                <div>
                                                    <span className="h6 mx-2 badge bg-secondary">{game.genre}</span>
                                                    {game.platform === "PC (Windows)" ?
                                                        <i className="fa-brands fa-windows"></i>
                                                        :
                                                        <i className="fa-solid fa-window-maximize"></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    </>
}
