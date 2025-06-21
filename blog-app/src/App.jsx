import { useState, useEffect } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Gets the initial list of blogs from local storage or sets it to an empty array.
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs([]);
    }
  }, []);

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
    setIsEditing(false);
    selectedPost(null);
  };

  /**
   * Handles the creation of a new blog post or the editing of an existing one.
   * If the blog post is being edited, it replaces the existing blog post in the state.
   * If not, it adds the new blog post to the state.
   * @param {Object} newBlog - The new blog post to add or edit.
   * @param {boolean} isEditing - Whether the blog post is being edited or not.
   */
  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEditing
        ? prevBlogs.map((blog) => (blog === selectedBlog ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedBlog(null);
  };

  /**
   * Switches the app state to show blogs and sets the selected post to the given blog
   * to be edited.
   * @param {Object} blog - The blog post to edit.
   * @function
   */
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  /**
   * Deletes a blog post.
   * Asks the user for confirmation before deleting.
   * If confirmed, removes the blog post from the state and local storage.
   * @param {Object} blog - The blog post to delete.
   * @function
   */
  const handleDeleteBlog = (blog) => {
    const answer = confirm("Are you sure you want to delete this blog post?");

    if (answer) {
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.filter((b) => b !== blog);
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        return updatedBlogs;
      });
    }
  };

  return (
    <div className="container">
      <div className="blog-app">
        {showNews && (
          <News
            showBlogs={handleShowBlogs}
            blogs={blogs}
            editBlog={handleEditBlog}
            deleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            showNews={handleShowNews}
            createBlog={handleCreateBlog}
            editBlog={selectedBlog}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};

export default App;
