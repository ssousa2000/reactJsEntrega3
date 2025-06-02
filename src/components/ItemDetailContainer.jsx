import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productos } from "../asyncMock";
import { useCart } from "../context/CartContext";
import ItemDetail from "./ItemDetail";  // Importa ItemDetail correctamente

function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, removeOneFromCart } = useCart();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const found = productos.find((p) => p.id.toString() === id);
      setItem(found || null);
      setLoading(false);
      setQuantity(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;

    const inCart = cartItems.find((cartItem) => cartItem.id === item.id);
    const currentQuantity = inCart ? inCart.quantity : 0;

    if (currentQuantity + quantity > item.stock) {
      alert("No puedes agregar más unidades que el stock disponible.");
      return;
    }

    addToCart(item, quantity);
  };

  const handleRemoveFromCart = () => {
    if (!item) return;
    removeOneFromCart(item.id);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto con ID <code>{id}</code> no existe.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ItemDetail
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
}

export default ItemDetailContainer;
