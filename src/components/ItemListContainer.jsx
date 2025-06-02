import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../asyncMock';
import ItemList from './ItemList';

function ItemListContainer({ greeting }) {
  const { id } = useParams(); // categoryId desde la URL
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id) {
      setItems(productos.filter((prod) => prod.categoria === id));
    } else {
      setItems(productos);
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">{greeting}</h3>
      <ItemList products={items} />
    </div>
  );
}

export default ItemListContainer;

