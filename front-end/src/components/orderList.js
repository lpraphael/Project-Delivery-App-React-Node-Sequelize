import React from 'react';
import { useSelector } from 'react-redux';
import totalValue from '../services/totalValue';

export default function OrderList() {
  const { qtyOfDrinks } = useSelector(({ saveDrinks }) => saveDrinks);
  const orderItens = qtyOfDrinks.filter((e) => e.qty > 0);
  const total = totalValue(qtyOfDrinks);

  console.log(qtyOfDrinks);

  const removeItem = () => {
    console.log('teste');
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
        {orderItens.map((item, i) => (
          <tbody key={ item.id }>
            <tr>
              <td
                data-testId={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i}
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
                data-testId={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {(item.price).replace('.', ',')}
              </td>
              <td
                data-testId={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {(Number(item.qty) * Number(item.price)).toFixed(2).replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  data-testId={ `customer_checkout__element-order-table-remove-${i}` }
                  onClick={ () => removeItem() }
                >
                  Remover
                </button>
              </td>
            </tr>
          </tbody>
        ))}
        <h1
          data-testId="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.replace('.', ',')} `}
        </h1>
      </table>
    </>
  );
}
