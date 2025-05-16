import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../asyncMock';

function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const found = productos.find((p) => p.id.toString() === id);
      setItem(found || null);
      setLoading(false);
    }, 500); // Simulamos pequeña espera

    return () => clearTimeout(timeout);
  }, [id]);

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
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{item.titulo}</h2>
          <p className="card-text">{item.descripcion}</p>
          <p className="card-text">
            <small className="text-muted">Stock disponible: {item.stock}</small>
          </p>
          <button className="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
