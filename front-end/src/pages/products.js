import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DrinkCard from '../components/drinkCard';
import NavBar from '../components/navBar';
import ShoppingCart from '../components/shoppingCart';
import { actionSaveDrinks } from '../Redux/actions';
import { getAllDrinks } from '../services/request';

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await getAllDrinks('/products');

      const result = drinks.map((drink) => {
        drink.qty = 0;
        return drink;
      });

      dispatch(actionSaveDrinks(result));
    };

    fetchDrinks();
  });

  return (
    <div
      className="h-screen w-screen justify-center items-center border"
    >
      <div className="flex p-[20px] justify-center">
        <NavBar />
      </div>
      <div className="flex flex-wrap p-[20px] justify-center items-center">
        <DrinkCard />
      </div>
      <div className="flex items-center justify-end">
        <ShoppingCart />
      </div>
    </div>
  );
}
