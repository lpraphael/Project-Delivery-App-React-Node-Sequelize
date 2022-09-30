import React from 'react';
import { useParams } from 'react-router-dom';

export default function Order() {
  // const [order, setOrder] = useState([]);
  // const total = totalValue(items);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchOrderById = async () => {
      const result = await getOrderById(`/sales/${id}`);
      console.log(result);
      setOrder(result);
    };

    fetchOrderById();
  }, []);

  return (
    <>
      <div>
        <p
          data-testId="customer_order_details__element-order-details-label-order-id"
        >
          id
        </p>
        <p
          data-testId="customer_order_details__element-order-details-label-seller-name"
        >
          vendedor
        </p>
        <p
          data-testId="customer_order_details__element-order-details-label-order-date"
        >
          data do pedido
        </p>
        <p
          data-testId={ `customer_order_details__
          element-order-details-label-delivery-status` }
        >
          status
        </p>
        <button
          type="button"
          data-testId=""
        >
          Marcar como entregue
        </button>
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={ item.id }>
              <td
                data-testId={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testId={ `customer_order_details__element-order-table-name-${i}` }
              >
                {item.name}
              </td>
              <td
                data-testId={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {item.qty}
              </td>
              <td
                data-testId={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {(item.price).replace('.', ',')}
              </td>
              <td
                data-testId={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(Number(item.qty) * Number(item.price)).toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1
        data-testId="customer_order_details__element-order-total-price"
      >
        {`Total: R$ ${total.replace('.', ',')} `}
      </h1> */}
    </>
  );
}
