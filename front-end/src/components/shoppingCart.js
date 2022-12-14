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
  }, [arrayOfDrinks, qtyOfDrinks]);

  const total = totalValue(qtyOfDrinks);

  return (
    <button
      className="flex justify-center items-center
      font-fontDic font-bold
      rounded-[10px] border w-[200px] h-[50px] text-nord-dark-2
      bg-nord-frost-1 mr-[50px] mb-[20px]"
      type="button"
      data-testId="customer_products__button-cart"
      onClick={ () => navigate('/customer/checkout') }
      disabled={ Number(total) === 0.00 }
    >
      Meu carrinho: R$
      <p
        data-testId="customer_products__checkout-bottom-value"
      >
        { total.replace('.', ',') }
      </p>
    </button>
  );
}
