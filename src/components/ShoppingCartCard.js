import { useContext } from "react";
import { ShopCartContext } from "./contexts/ShopCartContext";
import style from "../css/ShoppingCartCard.module.css";

const ShoppingCartCard = () => {
  const { shoppingCart, removeProduct } = useContext(ShopCartContext);

  const product = shoppingCart.map((product) => {
    return (
      <div className={style.product_card} key={product.vin}>
        <div className={style.img_content_wrapper}>
          <div className={style.img_wrapper}>
            <img
              className={style.img}
              src={`/assets/car-pictures/${product.make}-${product.model}-${product.year}.jpg`}
              alt="product"
            />
          </div>
          {/* /.img_wrapper */}
          <div className={style.content}>
            <p className={style.product_text}>
              <span className={style.product_make}>{product.make}</span>
              <span>Model: {product.model}</span>
              <span>Year: {product.year}</span>
              <span>Price: ${Number(product.price).toLocaleString()}</span>
            </p>
          </div>
        </div>
        {/* /.content */}
        {/* /.img_content_wrapper */}
        <div className={style.remove_button_wrapper}>
          <button
            className={style.remove_button}
            onClick={() => removeProduct(product)}
          >
            Remove Product
          </button>
        </div>
        {/* /.remove_button_wrapper */}
        <hr className={style.hr} />
      </div>
      // /.product_card
    );
  });

  return <div className={style.product_wrapper}>{product}</div>;
};

export default ShoppingCartCard;
