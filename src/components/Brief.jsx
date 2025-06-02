import React from "react";

export default function Brief({ subtotal }) {
  const shippingText = "Shipping: $5.00";
  const taxText = "Tax: $3.00";

  // Total ficticio sumando subtotal más valores fijos solo visualmente
  const total = subtotal + 5 + 3;

  return (
    <div className="mt-4 p-3 border rounded bg-light">
      <h5>Resumen de la compra</h5>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>{shippingText}</p>
      <p>{taxText}</p>
      <hr />
      <h5>Total final: ${total.toFixed(2)}</h5>
    </div>
  );
}
