import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function OrderContainer({ sale }) {
  const [bgColor, setBgColor] = useState('');
  const { id, status, totalPrice, deliveryAddress, deliveryNumber, saleDate } = sale;

  const newDate = new Date(saleDate);

  const statusTypes = {
    Pendente: 'Pendente',
    Preparando: 'Preparando',
    Entregue: 'Entregue',
  };

  useEffect(() => {
    switch (status) {
    case statusTypes.Pendente:
      setBgColor('#CCB800');
      break;
    case statusTypes.Preparando:
      setBgColor('#66CC00');
      break;
    case statusTypes.Entregue:
      setBgColor('#00CC9B');
      break;
    default:
      break;
    }
  }, [status, statusTypes.Entregue, statusTypes.Pendente, statusTypes.Preparando]);

  return (
    <section>
      <div
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        <p>Pedido</p>
        <span>{`00${id}`}</span>
      </div>
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
        style={ { backgroundColor: { bgColor } } }
      >
        <h2>{status}</h2>
      </div>
      <div data-testid={ `seller_orders__element-order-date-${id}` }>
        {newDate}
      </div>
      <div data-testid={ `seller_orders__element-card-price-${id}` }>
        {`R$ ${totalPrice}`}
      </div>
      <div data-testid={ `seller_orders__element-card-address-${id}` }>
        {`${deliveryAddress}, ${deliveryNumber}`}
      </div>
    </section>
  );
}

OrderContainer.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
};

export default OrderContainer;
