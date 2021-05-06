import style from "../css/ShoppingCartList.module.css";
import ShoppingCartCard from "./ShoppingCartCard";
import { ShopCartContext } from "./contexts/ShopCartContext";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

const ShoppingCartList = ({ hover }) => {
  const { totalPrice } = useContext(ShopCartContext);
  return (
    <div className={style.shopping_cart_list_wrapper}>
      <ShoppingCartCard />
      <div className={style.shopping_cart_summary}>
        <p className={style.totalprice_text}>
          Total price: ${Number(totalPrice).toLocaleString()}
        </p>
        <div className={style.checkout_link_wrapper}>
          <NavLink className={style.checkout_link} exact to="/checkout">
            To Checkout
          </NavLink>
        </div>
        {/* /.checkout_link_wrapper */}
      </div>
      {/* /.shopping_cart_summary */}
    </div>
  );
};

export default ShoppingCartList;
