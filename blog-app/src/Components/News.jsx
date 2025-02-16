import React from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";

const News = () => {
  return (
    <div className="news">
      <header className="news__header">News Header</header>
      <div className="news__content">
        <div className="navbar">
          <div className="user">User</div>
          <nav className="categories">Categories</nav>
        </div>
        <div className="news__section">
          <div className="headline">Headline</div>
          <div className="news__grid">News Grid</div>
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
