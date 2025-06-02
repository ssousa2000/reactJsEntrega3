import React from "react";
import ItemQuantitySelector from "./ItemQuantitySelector";
import AddItemButton from "./AddItemButton";

export default function ItemDetail({
  item,
  quantity,
  setQuantity,
  handleAddToCart,
  handleRemoveFromCart,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{item.titulo}</h2>

        {/* Si tienes el componente Description, agrégalo aquí */}
        <p className="card-text">{item.descripcion}</p>

        <p className="card-text">
          <small className="text-muted">Stock disponible: {item.stock}</small>
        </p>

        <ItemQuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          stock={item.stock}
        />

        <div className="d-flex flex-column flex-md-row gap-2 mt-3">
          <AddItemButton onClick={handleAddToCart} />
          <button
            className="btn btn-outline-danger flex-grow-1"
            onClick={handleRemoveFromCart}
          >
            Quitar del carrito
          </button>
        </div>
      </div>
    </div>
  );
}
