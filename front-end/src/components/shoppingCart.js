import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import totalValue from '../services/totalValue';

export default function ShoppingCart() {
  const { qtyOfDrinks } = useSelector(({ saveDrinks }) => saveDrinks);
  const [arrayOfDrinks, setArrayOfDrinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArrayOfDrinks(qtyOfDrinks);
  }, [arrayOfDrinks]);

  console.log('aqui', qtyOfDrinks);

  const total = totalValue(qtyOfDrinks);

  return (
    <aside>
      <button
        type="button"
        data-testId="customer_products__checkout-bottom-value"
        onClick={ () => navigate('/customer/checkout') }
      >
        { total.replace('.', ',') }
      </button>
    </aside>
  );
}
