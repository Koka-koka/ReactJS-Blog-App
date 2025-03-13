import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "./NewsModal";

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
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    /**
     * Fetches news articles based on the selected category and search query.
     * If no search query is provided, fetches top headlines for the selected category.
     * If a search query is provided, fetches search results for the query.
     * Sets the state of the news component with the fetched news articles.
     * @return {Promise<void>} A Promise that resolves when the news articles have been fetched.
     */
    const fetchNews = async () => {
      try {
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=e594a198a130f391ac23bccfbced3fa8`;

        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=9c404c552f6102517c9c531e4d8475da`;
        }

        const response = await axios.get(url);

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
  }, [selectedCategory, searchQuery]);

  /**
   * Handles the change of news category.
   *
   * Prevents the default action of the event and updates the selected category state.
   *
   * @param {Event} e - The event object associated with the category change.
   * @param {string} category - The new category to be selected.
   */

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  /**
   * Handles the search query submission.
   *
   * Prevents the default form submission action, updates the search query state
   * with the current search input value, and resets the search input to an empty string.
   *
   * @param {Event} e - The event object associated with the search form submission.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="news">
      {/* Header */}
      <header className="news__header">
        <h1 className="logo">News Blog</h1>
        <div className="search-bar">
          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news__content">
        <div className="navbar">
          {/* User */}
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Username</p>
          </div>
          <nav className="nav">
            <h2 className="nav__heading">Categories</h2>
            {/* Navigation */}
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
          {/* News Headline*/}
          <div
            className="headline"
            onClick={() => handleArticleClick(headline)}
          >
            <img src={headline?.image || noImg} alt={headline?.title} />
            <h2 className="headline__title">
              {headline?.title}
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>
          {/* News Grid */}
          <div className="news__grid">
            {news.map((article, index) => (
              <div
                className="news__grid-item"
                key={index}
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
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
