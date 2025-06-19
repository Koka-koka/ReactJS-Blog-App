import { useEffect, useState } from "react";
import userImg from "../assets/images/user.png";
import noImg from "../assets/images/no-img.png";
import "./Blogs.css";

// eslint-disable-next-line react/prop-types
function Blogs({ showNews, createBlog, editBlog, isEditing }) {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);

  // Sets the state of the form based on the isEditing prop and the editPost prop.
  useEffect(() => {
    if (isEditing && editBlog) {
      const { title, content, image } = editBlog;
      setTitle(title);
      setContent(content);
      setImage(image);
      setShowForm(true);
    } else {
      setTitle("");
      setContent("");
      setImage(null);
    }
  }, [isEditing, editBlog]);

  /**
   * Handles the image upload event.
   * If the selected file exceeds the maximum size of 1MB, shows an alert.
   * Otherwise, sets the state of the image to the uploaded image.
   * @param {Object} e - The event object from the image upload event.
   */
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes

      if (file.size > maxSize) {
        alert("Image size should be less than 1MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  /**
   * Handles the title input change event.
   *
   * Updates the state with the new title value if it is not empty and does not exceed 50 characters.
   *
   * @param {Object} e - The event object from the title input change event.
   */

  const handleTitleChange = (e) => {
    let newTitle = e.target.value;
    if (newTitle.length <= 50 && newTitle.trim().length !== 0) {
      setTitle(newTitle);
    }
  };

  /**
   * Handles the content input change event.
   *
   * Updates the state with the new content value if it is not empty after trimming.
   *
   * @param {Object} e - The event object from the content input change event.
   */
  const handleContentChange = (e) => {
    let newContent = e.target.value;
    if (newContent.trim().length !== 0) {
      setContent(newContent);
    }
  };

  /**
   * Handles the form submission event.
   *
   * If the title or content input is empty, sets the corresponding validity state to false.
   * If both title and content are valid, creates a new blog object with the provided values,
   * adds it to the list of blogs, resets the input fields, and shows a success message
   * for 3 seconds.
   *
   * @param {Object} e - The event object from the form submission event.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) {
        setTitleValid(false);
      } else {
        setTitleValid(true);
      }
      if (!content) {
        setContentValid(false);
      } else {
        setContentValid(true);
      }
      return;
    } else {
      setTitleValid(true);
      setContentValid(true);
    }

    const newBlog = {
      title: title,
      content: content,
      image: image || noImg,
    };

    createBlog(newBlog, isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs__left">
        <img src={userImg} alt="User" />
      </div>
      <div className="blogs__right">
        <button className="blogs__close-btn" onClick={showNews}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
        <div className={`blogs__right-form ${showForm ? "visible" : "hidden"}`}>
          {submitted && (
            <p className="submit-message">Post was successfully created</p>
          )}
          <h2>{isEditing ? "Edit Post" : "Create Post"}</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="img-upload">
              <img src={image || noImg} alt="Upload" />
              <label htmlFor="file-upload-input" className="file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input
                id="file-upload-input"
                type="file"
                onChange={handleImageUpload}
              />
            </div>
            <input
              type="text"
              placeholder="Add Title"
              className="title-input"
              value={title}
              onChange={handleTitleChange}
              maxLength={50}
            />
            {!titleValid && (
              <p className="error-message">
                Please enter a title between 1 and 50 characters long.
              </p>
            )}
            <textarea
              className="content-input"
              placeholder="Content"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            {!contentValid && (
              <p className="error-message">
                Please enter content more then o characters long.
              </p>
            )}
            <button className="submit-btn" type="submit" disabled={submitted}>
              {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>
        {!showForm && (
          <button
            className="blogs__newpost-btn"
            onClick={() => setShowForm(true)}
          >
            Create New Post
          </button>
        )}
      </div>
    </div>
  );
}

export default Blogs;
