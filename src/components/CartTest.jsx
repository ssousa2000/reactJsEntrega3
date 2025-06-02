import React from "react";
import { useCart } from "../context/CartContext";

export default function CartTest() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", marginTop: "1rem" }}>
      <h4>Total productos en carrito: {totalItems}</h4>
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
    </div>
  );
}
