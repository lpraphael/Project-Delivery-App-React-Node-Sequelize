export default function totalValue(drinks) {
  console.log('eu', drinks);
  const total = drinks
    .reduce((prevVal, drink) => prevVal + (drink.qty * Number(drink.price)), 0);

  console.log(total);

  return total.toFixed(2);
}
