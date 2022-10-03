import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionQtyDrinks } from '../Redux/actions';
import Loading from './loading';

export default function DrinkCard() {
  const [allDrinks, setAllDrinks] = useState([]);
  const { drinks } = useSelector(({ saveDrinks }) => saveDrinks);
  const dispatch = useDispatch();

  useEffect(() => {
    setAllDrinks(drinks);
  }, [allDrinks, drinks]);

  const quantityChange = (target, drink, index) => {
    if (target.name === 'number') {
      if (drink.qty < 0) {
        drink.qty = 0;
      } else {
        drink.qty = Number(target.value);
      }
    }

    if (target.name === 'sub') {
      if (drink.qty === 0) {
        drink.qty = 0;
      } else {
        drink.qty -= 1;
      }
    }

    if (target.name === 'sum') {
      drink.qty += 1;
    }

    const newArray = drinks;

    newArray[index] = drink;

    setAllDrinks(newArray);

    dispatch(actionQtyDrinks(newArray));
  };

  const renderCards = () => (allDrinks.map((drink, index) => index > 0 && (
    <div
      className="flex flex-col items-center text-center
        justify-center
        border-[1px]
        border-nord-aurora-1 m-[10px] p-[10px] text-nord-light-3 rounded-[5px] w-[280px]"
      key={ drink.id }
    >
      <div
        className="flex flex-col items-center justify-center"
      >
        <div
          className="w-[200px] h-[200px]
           flex items-center justify-center"
        >
          <img
            className="w-[200px] h-[200px] rounded-full"
            data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
            src={ drink.urlImage }
            alt={ drink.name }
          />
        </div>
        <p
          className="p-[5px] text-[20px]"
          data-testid={ `customer_products__element-card-price-${drink.id}` }
        >
          R$
          {drink.price.replace('.', ',')}
        </p>
      </div>
      <div>
        <p
          className="text-[15px]"
          data-testid={ `customer_products__element-card-title-${drink.id}` }
        >
          { drink.name }
        </p>
        <div className="flex items-center justify-center w-[250px]">
          <label htmlFor="drinkQty">
            <button
              className=" border w-[28px] h-[28px] items-center
              rounded-[2px]"
              data-testid={ `customer_products__button-card-rm-item-${drink.id}` }
              type="button"
              name="sub"
              onClick={ ({ target }) => quantityChange(target, drink, index) }
            >
              -
            </button>
            <input
              className="
            text-nord-dark-1 font-sans p-[3px] m-[5px] rounded-[5px] w-[150px]"
              id="drinkQty"
              type="number"
              name="number"
              value={ drink.qty }
              onChange={ ({ target }) => quantityChange(target, drink, index) }
              data-testid={ `customer_products__input-card-quantity-${drink.id}` }
            />
          </label>
          <button
            className="border w-[28px] h-[28px] rounded-[2px]"
            data-testid={ `customer_products__button-card-add-item-${drink.id}` }
            type="button"
            name="sum"
            onClick={ ({ target }) => quantityChange(target, drink, index) }
          >
            +
          </button>
        </div>
      </div>
    </div>
  )));

  const renderLoading = () => (
    <Loading />
  );

  return !allDrinks?.length !== 0 ? renderCards() : renderLoading();
}
