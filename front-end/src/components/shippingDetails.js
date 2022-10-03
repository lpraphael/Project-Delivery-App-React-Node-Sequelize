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
  }, [orders, user.token]);

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
    <div
      className="flex border w-[700px] flex-col
    bg-nord-light-1"
    >
      <div className="flex flex-col justify-start">
        <div className="flex flex-col">
          <label
            className="p-[5px] border
            bg-nord-frost-2"
            htmlFor="seller"
          >
            P. Vendedora Responsável
            <select
              className="m-[2px]"
              data-testid="customer_checkout__select-seller"
              id="seller"
              value={ selectSeller }
              onChange={ ({ target }) => setSeller(target.value) }
            >
              {
                sellers
                  .map(({ name }) => <option key={ name } value={ name }>{name}</option>)
              }
            </select>
          </label>
          <div className="p-[5px] bg-nord-frost-3 border">
            <label htmlFor="address">
              Endereço:
              <input
                className="border p-[2px]"
                id="address"
                type="address"
                name="address"
                value={ infos.address }
                onChange={ handleChange }
                data-testid="customer_checkout__input-address"
              />
            </label>
          </div>
          <div className="p-[5px] bg-nord-aurora-4 border">
            <label htmlFor="number">
              Número:
              <input
                className="border p-[2px] ml-[12px]"
                id="number"
                type="text"
                name="number"
                value={ infos.number }
                onChange={ handleChange }
                data-testid="customer_checkout__input-address-number"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end border bg-nord-aurora-2">
          <button
            className="border w-[160px] h-[35px] m-[10px] rounded-[10px] bg-nord-dark-1
            text-nord-light-1
          cursor-{
            disabled:hover:cursor-not-allowed
            hover:cursor-pointer
            hover:bg-nord-aurora-1 hover:text-nord-light-1 hover:font-fontDic
            hover:font-medium disabled-cursor-not-allowed
          }"
            type="button"
            data-testId="customer_checkout__button-submit-order"
            disabled={
              Number(total) === 0 || infos.address === '' || infos.number === ''
            }
            onClick={ () => orderCompleted() }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
