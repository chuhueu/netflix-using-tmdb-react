import axios from "../axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
const SEARCH_URL =
  "http://api.themoviedb.org/3/search/movie?api_key=8688b68fb8a246d29608ef3a12c99ea8&query=";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [trailerUrl, setTrailerUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  // movieTrailer( 'Oceans Eleven', 1960 )
  // .then( response => console.log( response ) )

  //a snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movie.name);
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=ZrKnEM3TmQI
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(SEARCH_URL + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });

    console.log(movies);
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
};

export default Row;