import SelectedItems from './SelectedItems'
import style from '../css/CheckoutPage.module.css'

const ItemsCard = () => {

  // returns boilerplate and component
  return (
    <div>
      <div className={style.itemsCard}>
        <div className={style.cartSummary}>
          <h3>Cart Summary</h3>
        </div>
        <div className={style.selectedItems}>
          <SelectedItems />
        </div>
      </div>
    </div>
  );
}

export default ItemsCard;
