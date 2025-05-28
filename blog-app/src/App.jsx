import { useState } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
  };

  return (
    <div className="container">
      <div className="blog-app">
        {showNews && <News showBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs showNews={handleShowNews} />}
      </div>
    </div>
  );
};

export default App;
