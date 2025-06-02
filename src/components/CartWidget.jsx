import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart" style={{ color: "white", cursor: "pointer", fontWeight: "bold", textDecoration: "none" }}>
      🛒 {totalQuantity}
    </Link>
  );
}
