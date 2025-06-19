import "./BlogsModal.css";
function BlogsModal({ show, post, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <div className="blogs-modal modal">
      <div className="modal__content">
        <span className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={post.image} alt="Modal Image" className="blogs-modal__img" />
        <h2 className="blogs-modal__title">{post.title}</h2>
        <p className="blogs-modal__text">{post.content}</p>
      </div>
    </div>
  );
}

export default BlogsModal;
