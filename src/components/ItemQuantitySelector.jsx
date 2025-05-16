import React from 'react';

export default function ItemQuantitySelector({ quantity, setQuantity, stock }) {
  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <button onClick={decrement} className="btn btn-outline-secondary">-</button>
      <span>{quantity}</span>
      <button onClick={increment} className="btn btn-outline-secondary">+</button>
    </div>
  );
}
