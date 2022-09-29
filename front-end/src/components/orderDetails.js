import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrdersById,
  handleDispatchCheck, handlePrepareCheck } from '../services/request';

function OrderDetails() {
  const [sale, setSale] = useState({});
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrdersById(user.token, id);
      setSale(result);
    };
    fetchOrder();
  }, [id, sale, user.token]);

  const newDate = new Date(sale.saleDate);
  const newDeliveryLabelOrderId = 'element-order-details-label-delivery-status';

  // Buttons created separately because of lint erros
  const buttonPrepareOrder = () => (
    <button
      type="button"
      data-testid="seller_order_details__button-preparing-check"
      onClick={ () => handlePrepareCheck(user.token, id) }
      disabled={ sale.status !== 'Pendente' }
    >
      Preparar Pedido
    </button>
  );

  const buttonDispatchOrder = () => (
    <button
      type="button"
      data-testid="seller_order_details__button-dispatch-check"
      onClick={ () => handleDispatchCheck(user.token, id) }
      disabled={ sale.status === 'Pendente'
  || sale.status === 'Em Trânsito' || sale.status === 'Entregue' }
    >
      Saiu para entrega
    </button>
  );

  return (
    <main>
      <h1>Detalhe do Pedido</h1>
      <table>
        <thead>
          <tr>
            <th data-testid="seller_order_details__element-order-details-label-order-id">
              { `Pedido 00${id} `}
            </th>
            <th
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {moment(newDate.toString()).format('DD/MM/yyyy')}
            </th>
            <th data-testid={ `seller_order_details__${newDeliveryLabelOrderId}` }>
              {sale.status}
            </th>
            <th>
              { buttonPrepareOrder() }
            </th>
            <th>
              { buttonDispatchOrder() }
            </th>
          </tr>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { sale.products && sale.products.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.salesProduct.quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$ ${product.price}`.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$ ${((product.salesProduct.quantity) * Number(product.price))
                  .toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sale-totalPrice">
        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: R$ ${sale.totalPrice}`.replace('.', ',') }
        </span>
      </div>
    </main>
  );
}

export default OrderDetails;
