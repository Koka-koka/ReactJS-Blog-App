import { useState, useEffect } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);

  /**
   * Switches the app state to show blogs.
   * @function
   */
  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  /**
   * Switches the app state to show news.
   * @function
   */
  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
  };

  /**
   * Adds a new blog to the current list of blogs and updates local storage.
   * @param {Object} newBlog - The new blog object to be added.
   * Updates the state with the new list of blogs and persists it in local storage.
   */

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlog) => {
      const updatedBlogs = [...prevBlog, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  // Gets the initial list of blogs from local storage or sets it to an empty array.
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs([]);
    }
  }, []);

  return (
    <div className="container">
      <div className="blog-app">
        {showNews && <News showBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && (
          <Blogs showNews={handleShowNews} createBlog={handleCreateBlog} />
        )}
      </div>
    </div>
  );
};

export default App;
