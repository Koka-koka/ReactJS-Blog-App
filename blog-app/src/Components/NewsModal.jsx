import "./NewsModal.css";

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal__content">
        <span className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="modal__image"
            />
            <h2 className="modal__title">{article.title}</h2>
            <p className="modal__source">Source: {article.source.name}</p>
            <p className="modal__date">
              Date:{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal__text">{article.description}</p>
            <a
              href={article.url}
              className="modal__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
