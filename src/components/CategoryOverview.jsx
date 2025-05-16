import React from 'react';
import { Link } from 'react-router-dom';

const categorias = [
  { id: 'vehiculos', nombre: 'Vehículos' },
  { id: 'electronica', nombre: 'Electrónica' },
  { id: 'libros', nombre: 'Libros' }
];

function CategoryOverview() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Explora nuestras categorías</h2>
      <div className="row">
        {categorias.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.id}>
            <div className="card h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title mb-3">{cat.nombre}</h5>
                <Link to={`/category/${cat.id}`} className="btn btn-outline-primary">
                  Ver productos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryOverview;
