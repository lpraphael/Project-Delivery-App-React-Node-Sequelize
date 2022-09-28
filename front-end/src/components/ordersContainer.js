import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

function OrderContainer({ sale }) {
  console.log(sale);
  const [bgColor, setBgColor] = useState('');
  const [role, setRole] = useState('');
  const { id, status, totalPrice, deliveryAddress, deliveryNumber, saleDate } = sale;

  const newDate = new Date(saleDate);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'customer') {
      setRole('customer');
    }

    if (user.role === 'seller') {
      setRole('seller');
    }
  }, []);

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
      setBgColor('#FF0000');
      break;
    }
  }, [status, statusTypes.Entregue, statusTypes.Pendente, statusTypes.Preparando]);

  return (
    <Link to={ `/${role}/orders/${id}` }>
      <div>
        <div
          data-testid={ `${role}_orders__element-order-id-${id}` }
        >
          <p>Pedido</p>
          <span>{`00${id}`}</span>
        </div>
        <div
          data-testid={ `${role}_orders__element-delivery-status-${id}` }
          style={ { backgroundColor: { bgColor } } }
        >
          <h2>{status}</h2>
        </div>
        <div data-testid={ `${role}_orders__element-order-date-${id}` }>
          <div>
            {moment(newDate.toString()).format('DD/MM/yyyy')}
          </div>
        </div>
        <div data-testid={ `${role}_orders__element-card-price-${id}` }>
          {`${totalPrice.toString().replace('.', ',')}`}
        </div>
        <div data-testid={ `${role}_orders__element-card-address-${id}` }>
          {`${deliveryAddress}, ${deliveryNumber}`}
        </div>
      </div>
    </Link>
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
