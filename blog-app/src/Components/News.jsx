import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "world",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=e594a198a130f391ac23bccfbced3fa8`
        );

        const fetchedNews = response.data.articles;

        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg;
          }
        });

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [selectedCategory]);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

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
              {categories.map((category) => (
                <li className="nav__item" key={category}>
                  <a
                    className="nav__link"
                    href="#"
                    onClick={(e) => handleCategoryChange(e, category)}
                  >
                    {category}
                  </a>
                </li>
              ))}
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
            <img src={headline?.image || noImg} alt={headline?.title} />
            <h2 className="headline__title">
              {headline?.title}
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>
          <div className="news__grid">
            {news.map((article, index) => (
              <div className="news__grid-item" key={index}>
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
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
