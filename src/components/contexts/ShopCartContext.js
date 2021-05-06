import { createContext, useState, useEffect } from "react";

export const ShopCartContext = createContext();

export default function ShopCartContextProvider({ children }) {
	const [shoppingCart, setShoppingCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	// Loads data from local storage
	useEffect(() => {
		const data = localStorage.getItem("shoppingcart");

		// Checks if there are data stored in local storage
		if (data) {
			// Loads the data and pushes it to shopping cart
			setShoppingCart(JSON.parse(data) ?? []);
		}
	}, []);

	// Save information to local storage whenever updates are made to shopping cart
	// And also set the total price by combining all the cars' prices
	useEffect(() => {
		localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
		setTotalPrice(shoppingCart.reduce((acc, value) => acc + value.price, 0));
	}, [shoppingCart]);

	function itemExists(item) {
		return Boolean(shoppingCart.find(car => car.vin === item.vin));
	}

	function emptyCart() {
		setShoppingCart([]);
	}

	// Adds product to shopping cart
	function addToCart(car) {
		// Checks if shoppingCart already contains car/product
		if (shoppingCart.some(product => product.vin === car.vin)) {
			return;
		} else {
			// if shoppingCart does not already contains car/product, new product/car will be pushed into the shoppingCart
			setShoppingCart(p => [...p, car]);
		}
	}

	// Removes product from shoppingCart
	function removeProduct(car) {
		setShoppingCart(shoppingCart.filter(product => product.vin !== car.vin));
	}

	const counter = shoppingCart.length;

	return (
		<ShopCartContext.Provider
			value={{
				addToCart,
				shoppingCart,
				setShoppingCart,
				removeProduct,
				totalPrice,
				itemExists,
				counter,
				emptyCart,
			}}
		>
			{children}
		</ShopCartContext.Provider>
	);
}
