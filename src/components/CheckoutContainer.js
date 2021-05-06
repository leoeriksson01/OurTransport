import style from '../css/CheckoutPage.module.css'
import CheckoutForm from './CheckoutForm';
import ItemsCard from './ItemsCard';

const CheckoutContainer = () => {
  // return two components for boilerplate
  return (
    <div className={style.checkoutCon}>
      <CheckoutForm />
      <ItemsCard />
    </div>
  );
}

export default CheckoutContainer;
