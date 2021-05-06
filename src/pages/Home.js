import style from "../css/Home.module.css";
import ProductListing from "../components/ProductListing";
import Form from "../components/SearchForm";
import Hero from "../components/HeroSection";

const Home = () => {
  return (
    // <p>Home</p>
  <div id={style.home}>
    <div id={style.heroComponent}>
      <Hero/>
    </div>
    <div className={style.wrapper}>
      <div id={style.search_field_container}>
        <Form/>
      </div>
      <div id={style.product_listing_container}>
        <ProductListing />
      </div>
    </div>
  </div>  
  );
};

export default Home;
