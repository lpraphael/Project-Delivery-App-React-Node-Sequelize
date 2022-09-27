export default function totalValue(drinks) {
  const total = drinks
    .reduce((prevVal, drink) => prevVal + (drink.qty * Number(drink.price)), 0);

  return total.toFixed(2);
}
