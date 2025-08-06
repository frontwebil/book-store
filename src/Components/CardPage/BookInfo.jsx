
export function BookInfo({ currentBook }) {
  return (
    <div className="card__page--book-info">
      <div className="card__page--book-info-row">
        <p>Автор:</p>
        <p>{currentBook.author}</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Жанр:</p>
        <p>{currentBook.genre}</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Кількість сторінок:</p>
        <p>{currentBook.pages}</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Формат:</p>
        <p>Паперова</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Мова книги:</p>
        <p>Українська</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Обкладинка:</p>
        <p>Тверда</p>
      </div>
      <div className="card__page--book-info-row">
        <p>Наявність ілюстрацій:</p>
        <p>Так</p>
      </div>
      <div className="description-block">
        <h3>Про книгу</h3>
        <p>{currentBook.description}</p>
      </div>
    </div>
  );
}
