import React from "react";
import requests from "../Requests";
import Banner from "./Banner";
import "./HomeScreen.css";
import Nav from "./Nav";
import Row from "./Row";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Router>
        <Nav />

        <Banner />

        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movie" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movie" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movie" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movie" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

        <Footer />
      </Router>
    </div>
  );
};

export default HomeScreen;
