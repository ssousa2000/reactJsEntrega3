import React from "react";
import { useCart } from "../context/CartContext";
import Brief from "./Brief";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.precio || 0;
    return acc + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return <p className="container mt-5">El carrito está vacío.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      <ul className="list-group">
        {cartItems.map((item) => {
          const price = item.price || item.precio || 0;
          const subtotalItem = price * item.quantity;

          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{item.name || item.titulo}</h5>
                <p>{item.description || item.descripcion}</p>
                <small>Precio unitario: ${price.toFixed(2)}</small>
              </div>
              <div>
                <span className="badge bg-primary rounded-pill">
                  Cantidad: {item.quantity}
                </span>
                <br />
                <strong>Subtotal: ${subtotalItem.toFixed(2)}</strong>
              </div>
            </li>
          );
        })}
      </ul>

      <Brief subtotal={subtotal} />

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-danger flex-grow-1" onClick={clearCart}>
          Vaciar carrito
        </button>
        <button className="btn btn-success flex-grow-1" onClick={() => alert("Pago simulado")}>
          Ir a pagar
        </button>
      </div>
    </div>
  );
}
