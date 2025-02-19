import React from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import techImg from "../assets/images/tech.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import worldImg from "../assets/images/world.jpg";
import healthImg from "../assets/images/health.jpg";
import nationImg from "../assets/images/nation.jpg";

const News = () => {
  return (
    <div className="news">
      <header className="news__header">
        <h1 className="logo">News Blog</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search News..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news__content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Username</p>
          </div>
          <nav className="nav">
            <h2 className="nav__heading">Categories</h2>
            <ul className="nav__menu">
              <li className="nav__item">
                <a className="nav__link" href="#">
                  General
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Business
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Technology
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Entertainment
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Sports
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Science
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Health
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Nation
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Bookmarks <i className="fa-regular fa-bookmark"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="news__section">
          <div className="headline">
            <img src={techImg} alt="Headline Image" />
            <h2 className="headline__title">
              Lorem ipsum dolor sit amet consectetur adipisicing.
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>
          <div className="news__grid">
            <div className="news__grid-item">
              <img src={techImg} alt="Tech Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news__grid-item">
              <img src={sportsImg} alt="Sports Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news__grid-item">
              <img src={scienceImg} alt="Science Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news__grid-item">
              <img src={worldImg} alt="World Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news__grid-item">
              <img src={healthImg} alt="Health Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news__grid-item">
              <img src={nationImg} alt="Nation Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
          </div>
        </div>
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news__footer">Footer</footer>
    </div>
  );
};

export default News;
