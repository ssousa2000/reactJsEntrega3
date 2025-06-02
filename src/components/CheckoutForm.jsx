import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.precio || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con datos:", form);
    console.log("Items en el carrito:", cartItems);
    console.log("Subtotal:", subtotal);
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("Iniciando proceso de compra...");
      const order = {
        buyer: form,
        items: cartItems,
        total: subtotal,
        createdAt: Timestamp.now(),
      };
      console.log("Orden creada:", order);
      
      console.log("Intentando guardar en Firebase...");
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("¡Orden guardada exitosamente! ID:", docRef.id);
      
      setOrderId(docRef.id);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      console.log("Número de orden generado:", randomNum);
      setRandomOrderNumber(randomNum);
      clearCart();
    } catch (err) {
      console.error("Error detallado:", err);
      setError("Error al procesar la compra: " + err.message);
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
        <p>Tu número de compra es: <strong>{randomOrderNumber}</strong></p>
        <p>¡Te enviaremos un correo con los detalles de tu pedido!</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
          Regresar a la página principal
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Finalizar compra</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input 
            type="tel" 
            className="form-control" 
            name="telefono" 
            value={form.telefono} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-success" 
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
            <br />
            <small>Revisa la consola del navegador para más detalles.</small>
          </div>
        )}
      </form>
    </div>
  );
} 