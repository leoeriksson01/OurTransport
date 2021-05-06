import style from "../css/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductListing = () => {
  return (
    <div className={style.product_list}>
      <ProductCard />
    </div>
  );
};

export default ProductListing;
