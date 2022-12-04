import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import HomeStyle from './Home.module.css'

export default function Home() {

    const [popularGames, setpopularGames] = useState([])

    async function getPopularGames() {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            params: { 'sort-by': 'popularity' },
            headers: {
                'X-RapidAPI-Key': '3e612f0074msh6c309cdc83ca45ep15be2djsnd8558566352c',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
        let popular = data.splice(0, 3);
        setpopularGames(popular)
        console.log(popular);
    }

    useEffect(() => {
        getPopularGames()
    }, [])

    return <>
        <div className={`${HomeStyle.sectionLayer} ${HomeStyle.firstsection}`}>
            <section className={`container py-5 text-center`} >
                <h2>Find and track the best <span className='text-info'>free-to-play</span> games!</h2>
                <p>Track what you've played and search for what to play next! Plus get free premium loot!</p>
                <button className='btn btn-outline-secondary' >
                    <Link to="/all" className={`text-secondary text-decoration-none ${HomeStyle.browsebtn}`}>Browse Games</Link>
                </button>
            </section>
        </div>
        <h2 className='h4 my-5 container'><i class="fa-solid fa-robot"></i> Personalized Recommendations</h2>
        <section className='container'>
            <div className="row g-5 w-100 d-flex jsutify-content-between align-items-center">
                {popularGames.map((item, index) => <>
                    <div className="col-lg-4" key={index}>
                        <Link to={`/details/${item.id}`} className='text-secondary text-decoration-none'>
                            <div className="card homecard w-100">
                                <img src={item.thumbnail} className="card-img-top" alt={item.title} />
                                <div className="card-body position-relative">
                                    <h3 className='h4'>{item.title}</h3><span className=" position-absolute end-0 top-0  h4 badge bg-info">Free</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </>)}
            </div>
        </section>
    </>
}
