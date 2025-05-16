import React from "react";

export default function AddItemButton({ onClick }) {
  return (
    <button className="btn btn-primary flex-grow-1" onClick={onClick}>
      Agregar al carrito
    </button>
  );
}
