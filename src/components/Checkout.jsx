import React from "react";
import { useCart } from "../context/CartContext";
import Brief from "./Brief";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.precio || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (subtotal <= 0) {
      setError("El subtotal debe ser mayor a $0.00 para procesar la compra.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const order = {
        items: cartItems,
        total: subtotal,
        createdAt: Timestamp.now(),
        // Puedes agregar datos de usuario aquí si tienes un formulario
      };
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      setError("Error al procesar la compra. Verifica tu conexión o configuración de Firebase.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderId) {
    return <p className="container mt-5">El carrito está vacío.</p>;
  }

  if (orderId) {
    return (
      <div className="container mt-5 text-center">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
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
        <button className="btn btn-danger flex-grow-1" onClick={clearCart} disabled={loading}>
          Vaciar carrito
        </button>
        <button className="btn btn-success flex-grow-1" onClick={() => navigate('/checkout')} disabled={loading}>
          Ir a pagar
        </button>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
