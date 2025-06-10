import { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.png";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";

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

// eslint-disable-next-line react/prop-types
const News = ({ showBlogs, blogs }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

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

  /**
   * Fetches news articles when the selected category or search query changes.
   */
  useEffect(() => {
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

  /**
   * Handles the click event on an article.
   *
   * Updates the selected article state with the clicked article and shows the modal.
   *
   * @param {Object} article - The clicked article object.
   */
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  /**
   * Retrieves the saved bookmarks from local storage and updates the bookmarks state.
   */
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  /**
   * Handles the click event on the bookmark button.
   *
   * Updates the bookmarks state and local storage with the clicked article.
   * If the article is already bookmarked, removes it from bookmarks and local storage.
   * If the article is not bookmarked, adds it to bookmarks and local storage.
   *
   * @param {Object} article - The clicked article object.
   */
  const handleBookmarkClick = (article) => {
    if (bookmarks.some((bookmark) => bookmark.url === article.url)) {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.url !== article.url)
      );
      localStorage.setItem(
        "bookmarks",
        JSON.stringify(
          bookmarks.filter((bookmark) => bookmark.url !== article.url)
        )
      );
    } else {
      setBookmarks((prevBookmarks) => [...prevBookmarks, article]);
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, article])
      );
    }
  };

  return (
    <div className="news">
      {/* Header */}
      <header className="news__header">
        <h1 className="logo">News App</h1>
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
            <button onClick={() => showBlogs()}>Add Blog Post</button>
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
                <a
                  className="nav__link"
                  href="#"
                  onClick={() => setShowBookmarks(true)}
                >
                  Bookmarks{" "}
                  <i
                    className={`${
                      bookmarks.length > 0 ? "fa-solid" : "fa-regular"
                    } fa-bookmark`}
                  ></i>
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
              <i
                className={`${
                  bookmarks.some((bookmark) => bookmark.url === headline?.url)
                    ? "fa-solid"
                    : "fa-regular"
                } fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkClick(headline);
                }}
              ></i>
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
                  <i
                    className={`${
                      bookmarks.some((bookmark) => bookmark.url === article.url)
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
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
        <Bookmarks
          show={showBookmarks}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h3 className="my-blogs__heading">My Blogs</h3>
          <div className="my-blogs__posts">
            {/* eslint-disable-next-line react/prop-types */}
            {blogs.map((blog, index) => (
              <div className="my-blogs__post" key={index}>
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>
                <div className="my-blogs__post-btns">
                  <button className="my-blogs__post-edit">
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button className="my-blogs__post-delete">
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news__footer">
        <p>News & Blog App</p>
        <p>Copyright &copy; {new Date().getFullYear()}, All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default News;
