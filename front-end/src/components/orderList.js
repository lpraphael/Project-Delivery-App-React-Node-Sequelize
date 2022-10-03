import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import totalValue from '../services/totalValue';

export default function OrderList() {
  const { qtyOfDrinks } = useSelector(({ saveDrinks }) => saveDrinks);
  const orderItens = qtyOfDrinks.filter((e) => e.qty > 0);
  const [items, setItems] = useState([]);
  const total = totalValue(items);
  localStorage.setItem('orders', JSON.stringify(items));

  useEffect(() => {
    setItems(orderItens);
  }, []);

  const removeItem = (itemId) => {
    const filteredItems = items.filter(({ id }) => id !== itemId);
    if (orderItens.length === 1) {
      setItems([]);
    }
    setItems(filteredItems);

    localStorage.setItem('orders', JSON.stringify(items));
  };

  return (
    <div
      className="flex justify-center flex-col w-[700px]
      "
    >
      <h2
        className="text-[20px] text-nord-dark-1 border bg-nord-light-1
      font-bold"
      >
        Finalizar Pedido
      </h2>
      <table className="">
        <thead className=" justify-between w-[700px]">
          <tr className="font-thin border bg-nord-light-3">
            <th>Item</th>
            <th>Descrição</th>
            <th className="border">Quantidade</th>
            <th className="border">Valor Unitário</th>
            <th className="border">Sub-total</th>
            <th className="border">Remover Item</th>
          </tr>
        </thead>
        <tbody className="border">
          {items.map((item, i) => (
            <tr key={ item.id }>
              <td
                className="border text-center flex justify-center bg-nord-aurora-4"
                data-testId={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                className="border text-center bg-nord-frost-4
                font-fontDic"
                data-testId={ `customer_checkout__element-order-table-name-${i}` }
              >
                {item.name}
              </td>
              <td
                className="border flex justify-center bg-nord-frost-1
                text-nord-dark-2"
                data-testId={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {item.qty}
              </td>
              <td
                className="border text-center bg-nord-frost-3
                text-nord-dark-1"
                data-testId={
                  `customer_checkout__element-order-table-unit-price-${i}`
                }
              >
                {(item.price).replace('.', ',')}
              </td>
              <td
                className="border text-center bg-nord-aurora-4"
                data-testId={
                  `customer_checkout__element-order-table-sub-total-${i}`
                }
              >
                {(Number(item.qty) * Number(item.price)).toFixed(2).replace('.', ',')}
              </td>
              <td
                className="border flex items-center justify-center
                bg-nord-aurora-2 text-nord-dark-3
                hover:bg-nord-light-2 hover:text-nord-aurora-1 hover:font-fontDic
          hover:font-medium"
              >
                <button
                  type="button"
                  data-testId={ `customer_checkout__element-order-table-remove-${i}` }
                  onClick={ () => removeItem(item.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <h1
          className="flex items-center border
          h-[50px] w-[130px] justify-center
          bg-nord-aurora-5 text-nord-dark-2
          font-fontDic"
          data-testId="customer_checkout__element-order-total-price text-nord-light-2"
        >
          {`Total: R$ ${total.replace('.', ',')} `}
        </h1>
      </div>
    </div>
  );
}
