import React, { useState, useEffect } from 'react';
import { getAllSellers } from '../services/request';

export default function ShippingDetails() {
  const [selectSeller, setSelectSeller] = useState('');
  const [sellers, setSellers] = useState([]);
  const [adress, setAddress] = useState({ address: '', number: '' });

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await getAllSellers();

      setSellers(result);

      console.log(result);
    };
    fetchSellers();
  });

  const setSeller = (value) => {
    setSelectSeller(value);
  };

  const handleChange = ({ target: { name, value } }) => {
    setAddress((prev) => ({ ...prev, [name]: value }));
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
          {[0, 1, 2].map((el) => <option key={ el } value={ el }>{el}</option>)}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          id="address"
          type="address"
          name="address"
          value={ adress }
          onChange={ handleChange }
          data-testid="common_login__input-password"
        />
      </label>
    </>
  );
}
