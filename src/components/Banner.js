import React,{useState, useEffect} from 'react';
import './Banner.css';
import {FaPlay} from 'react-icons/fa';
import axios from '../axios';
import requests from '../Requests';
const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [readMore,  setReadMore] = useState(false);

    const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
            request.data.results[
                Math.floor(Math.random()*request.data.results.length-1)
            ]
        );
        return request;
    }
    useEffect(() => {
        fetchData();
    }, [])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie.name || movie.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button"><FaPlay className="icon-play"/> Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {readMore ? movie.overview : truncate(movie.overview, 150)}
                    <button onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'show less' : 'read more'}
                    </button>
                </h1>
            </div>

            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner
