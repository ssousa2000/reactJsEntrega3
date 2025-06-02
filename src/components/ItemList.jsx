import React from "react";
import { Link } from "react-router-dom";

export default function ItemList({ products }) {
  if (!products || products.length === 0) {
    return <p>No hay productos para mostrar.</p>;
  }
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-3" key={product.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{product.titulo}</h5>
              <p className="card-text">{product.descripcion}</p>
              <p className="card-text">
                <strong>Precio: ${product.precio}</strong>
              </p>
              <Link to={`/item/${product.id}`} className="btn btn-outline-primary mt-2">
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 