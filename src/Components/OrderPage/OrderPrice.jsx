export function OrderPrice({ cart, totalPrice }) {
  
  return (
    <div className="order-price">
      {/* <h3>Разом</h3> */}
      <div className="price-per-book">
        <h4>{cart.length} товар(и):</h4>
        {cart.map((book) => (
          <div className="price-per-book-row" key={book._id}>
            <p>{book.title}</p>
            <p style={{ fontWeight: 700 }}>{book.price} грн.</p>
          </div>
        ))}
      </div>
      <div className="price-summary">
        <p>До сплати:</p>
        <p className="price-summary-numbers">{totalPrice} грн.</p>
      </div>
      <button className="order-button">Оформити замовлення</button>
    </div>
  );
}
