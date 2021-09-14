import React, { useState, useEffect } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      //làm mờ thanh navbar khi kéo xuống
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);


  return (
    <>
      <div className={`nav ${show && "nav_black"}`}>
        <div className="nav_contents">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="nav_logo"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
            className="nav_avatar"
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
