import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionQtyDrinks } from '../Redux/actions';
import Loading from './loading';

export default function DrinkCard() {
  const [allDrinks, setAllDrinks] = useState([]);
  // const [inputValue, setInputValue] = useState(0)
  // const [subValue, setsubValue] = useState(0)
  // const [sumValue, setsumValue] = useState(0)
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

    // console.log(newArray);

    setAllDrinks(() => newArray);

    dispatch(actionQtyDrinks(newArray));
  };

  const renderCards = () => (allDrinks.map((drink, index) => (
    <div key={ drink.id }>
      <div>
        <p
          data-testid={ `customer_products__element-card-price-${drink.id}` }
        >
          {drink.price.replace('.', ',')}
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
          src={ drink.urlImage }
          alt={ drink.name }
        />
      </div>
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${drink.id}` }
        >
          { drink.name }
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${drink.id}` }
          type="button"
          name="sub"
          onClick={ ({ target }) => quantityChange(target, drink, index) }
        >
          -
        </button>
        <label htmlFor="drinkQty">
          <input
            id="drinkQty"
            type="number"
            name="number"
            value={ drink.qty }
            onChange={ ({ target }) => quantityChange(target, drink, index) }
            data-testid={ `customer_products__input-card-quantity-${drink.id}` }
          />
        </label>
        <button
          data-testid={ `customer_products__button-card-add-item-${drink.id}` }
          type="button"
          name="sum"
          onClick={ ({ target }) => quantityChange(target, drink, index) }
        >
          +
        </button>
      </div>
    </div>
  )));

  const renderLoading = () => (
    <Loading />
  );

  return !allDrinks?.length !== 0 ? renderCards() : renderLoading();
}
