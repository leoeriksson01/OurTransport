import style from "../css/ProductCard.module.css";
import { useContext, useState } from "react";
import { CarContext } from "../components/contexts/CarContext";
import { ShopCartContext } from "../components/contexts/ShopCartContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const ProductCard = () => {
	const { products } = useContext(CarContext);
	const { addToCart, itemExists } = useContext(ShopCartContext);
	const [loadProducts, setLoadProducts] = useState(6);

	const handleButtonAdd = car => {
		// adds product to shopping cart
		addToCart(car);
	};

	const handleButtonLoad = () => {
		// adds + 6 to loadProducts (useState) - which renders additional 6 products/cars
		setLoadProducts(loadProducts + 6);
	};

	const handleButtonTop = () => {
		// scrolls to top position of page
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	// Load button
	const loadButton = (
		<div className={style.button_load_wrapper}>
			<button className={style.button_load} onClick={() => handleButtonLoad()}>
				Load more
			</button>
		</div>
	);

	// Back to top button
	const backTopButton = (
		<div className={style.button_back_top_wrapper}>
			<button onClick={handleButtonTop} className={style.button_back_top}>
				<FontAwesomeIcon icon={faArrowUp} />
			</button>
		</div>
	);

	// Maps out cars/products
	const product = products.map((car, index) => {
		if (index === loadProducts) {
			return null;
		} else if (index < loadProducts) {
			return (
				<div className={style.product_card} key={car.vin}>
					<NavLink exact to={`/car/${car.vin}`}>
						<div className={style.badge}>
							{Number(car.miles ?? 0).toLocaleString()} miles
						</div>

						{/* /.img */}
						<div className={style.img_wrapper}>
							<img
								className={style.img}
								src={`/assets/car-pictures/${car.make}-${car.model}-${car.year}.jpg`}
								alt="product"
							/>
						</div>
					</NavLink>

					{/* Card Text */}
					<div className={style.card_text_wrapper}>
						<NavLink exact to={`/car/${car.vin}`}>
							<div className={style.card_text_city}>
								<p>
									<FontAwesomeIcon icon={faMapMarkerAlt} /> {car.city}
								</p>
							</div>

							<div className={style.card_text_heading}>
								<p>
									{car.make} {car.model} {car.year}
								</p>
								<p className={style.card_text_price}>
									${Number(car.price).toLocaleString()}
								</p>
							</div>
						</NavLink>

						{/* Button */}
						<button
							disabled={itemExists(car)}
							onClick={() => handleButtonAdd(car)}
							className={`${style.button_add} ${
								itemExists(car) ? style.button_already_in_cart : ""
							}`}
						>
							{itemExists(car) ? "Already in cart" : "Add to cart"}
						</button>
					</div>
				</div>
			);
		} else {
			return null;
		}
	});

	return (
		<div className={style.product_list_container}>
			<div className={style.product_card_wrapper}>{product}</div>
			<div className={style.bottom_buttons_wrapper}>
				{loadProducts < products.length ? loadButton : ""}
				{backTopButton}
			</div>
		</div>
	);
};

export default ProductCard;
