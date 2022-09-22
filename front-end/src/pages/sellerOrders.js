import OrderContainer from '../components/orderContainer';
import { API } from '../services/request';

function SellerOrder() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    API.get('/seller/orders').then((response) => { setSales(response.data); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      { sales && sales.map((sale, index) => (
        <OrderContainer key={ index } sale={ sale } />
      ))}
    </div>
  );
}

export default SellerOrder;
