import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getOrdersById,
  getAllSellers,
  handleDispatchdelivered } from '../services/request';
import Loading from './loading';

function OrderDetailsCustomer() {
  const [sale, setSale] = useState({});
  const [seller, setSeller] = useState('');
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const newDate = new Date(sale.saleDate);
  const test = 'customer_order_details_';

  useEffect(() => {
    const fetchInfos = async () => {
      const result = await getOrdersById(user.token, id);

      const allSellers = await getAllSellers(user.token);

      console.log(allSellers);

      console.log(result);

      const vendor = allSellers.find((el) => el.id === result.sellerId);

      setSeller(vendor);

      console.log(vendor);

      setSale(result);
    };

    fetchInfos();
  }, [sale.status]);

  const handleDelivery = async () => {
    await handleDispatchdelivered(user.token, id);

    const result = await getOrdersById(user.token, id);

    setSale(result);
  };

  return (
    <main>
      <h1>Detalhe do Pedido</h1>
      {!sale ? <Loading /> : (
        <div>
          <table>
            <thead>
              <tr>
                <th
                  data-testid={ `${test}_element-order-details-label-order-id` }
                >
                  { `Pedido 00${id} `}
                </th>
                <th
                  data-testid={ `${test}_element-order-details-label-seller-name` }
                >
                  { seller.name }
                </th>
                <th
                  data-testid={ `${test}_element-order-details-label-order-date` }
                >
                  {moment(newDate.toString()).format('DD/MM/yyyy')}
                </th>
                <th
                  data-testid={ `${test}_element-order-details-label-delivery-status` }
                >
                  {sale.status}
                </th>
                <button
                  type="button"
                  data-testid={ `${test}_button-delivery-check` }
                  onClick={ () => handleDelivery() }
                  disabled={ sale.status === 'Entregue' }
                >
                  Marcar como entregue
                </button>
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
                    data-testid={ `${test}_element-order-table-item-number-${index}` }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `${test}_element-order-table-name-${index}` }
                  >
                    {product.name}
                  </td>
                  <td
                    data-testid={ `${test}_element-order-table-quantity-${index}` }
                  >
                    {product.salesProduct.quantity}
                  </td>
                  <td
                    data-testid={ `${test}_element-order-table-unit-price-${index}` }
                  >
                    {`R$ ${product.price}`.replace('.', ',')}
                  </td>
                  <td
                    data-testid={ `${test}_element-order-table-sub-total-${index}` }
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
              data-testid={ `${test}_element-order-total-price` }
            >
              { `Total: R$ ${sale.totalPrice}`.replace('.', ',') }
            </span>
          </div>
        </div>
      )}
    </main>
  );
}

export default OrderDetailsCustomer;
