import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSellers, createOrder } from '../services/request';
import totalValue from '../services/totalValue';

export default function ShippingDetails() {
  const [selectSeller, setSelectSeller] = useState('');
  const [sellers, setSellers] = useState([]);
  const [infos, setInfos] = useState({ address: '', number: '' });
  const user = JSON.parse(localStorage.getItem('user'));
  const orders = JSON.parse(localStorage.getItem('orders'));
  const total = totalValue(orders);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await getAllSellers(user.token);

      setSellers(result);
      setSelectSeller(result[0].name);
    };
    fetchSellers();
  }, [orders]);

  const setSeller = (value) => {
    setSelectSeller(value);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInfos((prev) => ({ ...prev, [name]: value }));
  };

  const sendingOrder = async (body) => {
    const result = await createOrder('/sales', body, user.token);

    return result;
  };

  const orderCompleted = async () => {
    const idSeller = sellers.find((seller) => seller.name === selectSeller);
    const ordersInfos = orders.map(({ qty, id }) => ({ quantity: qty, productId: id }));

    const newOrder = {
      userId: user.id,
      sellerId: idSeller.id,
      totalPrice: total,
      deliveryAddress: infos.address,
      deliveryNumber: infos.number,
      productsArray: ordersInfos,
    };

    const data = await sendingOrder(newOrder);
    navigate(`/customer/orders/${data.id}`);
  };

  return (
    <>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          data-testid="customer_checkout__select-seller"
          id="seller"
          value={ selectSeller }
          onChange={ ({ target }) => setSeller(target.value) }
        >
          {sellers.map(({ name }) => <option key={ name } value={ name }>{name}</option>)}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          id="address"
          type="address"
          name="address"
          value={ infos.address }
          onChange={ handleChange }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          id="number"
          type="text"
          name="number"
          value={ infos.number }
          onChange={ handleChange }
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
        type="button"
        data-testId="customer_checkout__button-submit-order"
        disabled={ Number(total) === 0 || infos.address === '' || infos.number === '' }
        onClick={ () => orderCompleted() }
      >
        FINALIZAR PEDIDO
      </button>
    </>
  );
}
