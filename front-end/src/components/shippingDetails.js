import React, { useState, useEffect } from 'react';
import { getAllSellers } from '../services/request';

export default function ShippingDetails() {
  const [selectSeller, setSelectSeller] = useState('');
  const [sellers, setSellers] = useState([]);
  const [infos, setInfos] = useState({ address: '', number: '' });

  useEffect(() => {
    const fetchSellers = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      const result = await getAllSellers(user.token);

      setSellers(result);
    };
    fetchSellers();
  }, []);

  const setSeller = (value) => {
    setSelectSeller(value);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInfos((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <label htmlFor="seller">
        Coluna
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
        Endereço
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
        onClick={ console.log('comprei!') }
      >
        FINALIZAR PEDIDO
      </button>
    </>
  );
}
