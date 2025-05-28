import { useState } from "react";
import userImg from "../assets/images/user.png";
import "./Blogs.css";
function Blogs({ showNews }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="blogs">
      <div className="blogs__left">
        <img src={userImg} alt="User" />
      </div>
      <div className="blogs__right">
        <button className="blogs__close-btn" onClick={showNews}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
        {/* Show the form when create post button is clicked */}
        {showForm ? (
          <div className="blogs__right-form">
            <h2>New Post</h2>
            <form>
              <div className="img-upload">
                <label htmlFor="file-upload-input" className="file-upload">
                  <i className="bx bx-upload"></i>Upload Image
                </label>
                <input id="file-upload-input" type="file" />
              </div>
              <input
                type="text"
                placeholder="Add Title"
                className="title-input"
              />
              <textarea
                className="content-input"
                placeholder="Content"
              ></textarea>
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        ) : (
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
