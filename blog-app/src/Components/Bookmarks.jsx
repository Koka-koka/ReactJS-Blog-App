import "./Bookmarks.css";
import noImg from "../assets/images/no-img.png";

const Bookmarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="bookmarks modal">
      <div className="modal__content">
        <span className="close-btn">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        <h2 className="bookmarks__heading">Bookmarked News</h2>
        <ul className="bookmarks__list">
          {bookmarks.map((bookmarkedArticle) => (
            <li
              className="bookmarks__item"
              key={bookmarkedArticle.url}
              onClick={() => {
                onSelectArticle(bookmarkedArticle);
                onClose();
              }}
            >
              <img
                src={bookmarkedArticle.image || noImg}
                alt={bookmarkedArticle.title}
                className="bookmarks__item-image"
              />
              <h3 className="bookmarks__item-title">
                {bookmarkedArticle.title}
              </h3>
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(bookmarkedArticle);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bookmarks;
