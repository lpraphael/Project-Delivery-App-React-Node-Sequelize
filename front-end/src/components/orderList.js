import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import totalValue from '../services/totalValue';
import Loading from './loading';

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
    <>
      <h2>
        Finalizar Pedido
      </h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        {!items ? <Loading /> : (
          <div>
            {items.map((item, i) => (
              <tbody key={ item.id }>
                <tr>
                  <td
                    data-testId={
                      `customer_checkout__element-order-table-item-number-${i}`
                    }
                  >
                    {i + 1}
                  </td>
                  <td
                    data-testId={ `customer_checkout__element-order-table-name-${i}` }
                  >
                    {item.name}
                  </td>
                  <td
                    data-testId={ `customer_checkout__element-order-table-quantity-${i}` }
                  >
                    {item.qty}
                  </td>
                  <td
                    data-testId={
                      `customer_checkout__element-order-table-unit-price-${i}`
                    }
                  >
                    {(item.price).replace('.', ',')}
                  </td>
                  <td
                    data-testId={
                      `customer_checkout__element-order-table-sub-total-${i}`
                    }
                  >
                    {(Number(item.qty) * Number(item.price)).toFixed(2).replace('.', ',')}
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testId={ `customer_checkout__element-order-table-remove-${i}` }
                      onClick={ () => removeItem(item.id) }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </div>
        )}
        <h1
          data-testId="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.replace('.', ',')} `}
        </h1>
      </table>
    </>
  );
}
