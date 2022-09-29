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
    switch (status) {
    case 'Pendente':
      setBgColor('#CCB800');
      break;
    case 'Preparando':
      setBgColor('#66CC00');
      break;
    case 'Em Trânsito':
      setBgColor('#2da0ec');
      break;
    case 'Entregue':
      setBgColor('#00CC9B');
      break;
    default:
      setBgColor('#FF0000');
      break;
    }
  }, [status]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'customer') {
      setRole('customer');
    }

    if (user.role === 'seller') {
      setRole('seller');
    }
  }, []);

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
          style={ { backgroundColor: bgColor } }
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
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
};

export default OrderContainer;
