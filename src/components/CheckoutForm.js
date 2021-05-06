import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { ShopCartContext } from "./contexts/ShopCartContext";
import style from "../css/CheckoutPage.module.css";

const CheckoutForm = () => {
	const { shoppingCart, emptyCart, totalPrice } = useContext(ShopCartContext);
	const { user } = useContext(UserContext);

	// useState for all the userinputs 
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [county, setCounty] = useState("");
	const [zip, setZip] = useState("");
	const [select, setSelect] = useState("");
	const [date, setDate] = useState("");

	const history = useHistory();

	// scroll to top because CheckoutConfirmation scrolls to bottom for some reason
	const toTop = () => {
		window.scrollTo(0, 0);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// get orders from localStorage if there are none, then initialize an empty array
		const orders = JSON.parse(localStorage.getItem("orders")) ?? [];
		// create an order linked to the user that is logged in and to the cars in the shoppingcart
		const order = { email: user?.email, items: shoppingCart };
		// updates orders value to include the current order
		localStorage.setItem("orders", JSON.stringify([...orders, order]));
		emptyCart();
		toTop();

		// redirects user and pushes the states to CheckoutConfirmation.js
		history.push({
			pathname: "/confirmation",
			state: {
				name,
				email,
				address,
				county,
				zip,
				select,
				date,
				shoppingCart,
				totalPrice,
			},
		});
	};

	return (
		<div className={style.checkoutForm}>
			<h3>Billing and Shipping Details</h3>
			<form className={style.formEl} onSubmit={handleSubmit}>
				<fieldset className={style.fieldset}>
					<label htmlFor="name">First and last name</label>
					<input
						value={name}
						type="text"
						id="name"
						onChange={e => setName(e.target.value)}
					/>
					<label htmlFor="email">Email address</label>
					<input
						value={email}
						type="text"
						id="email"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="address">Adress</label>
					<input
						value={address}
						type="text"
						id="address"
						onChange={e => setAddress(e.target.value)}
					/>
					<div className={style.inputContainer}>
						<div className={`${style.smallInput} ${style.leftInput}`}>
							<label htmlFor="county">County</label>
							<input
								value={county}
								type="text"
								id="county"
								onChange={e => setCounty(e.target.value)}
							/>
						</div>
						<div className={style.smallInput}>
							<label htmlFor="zip">Zip Code</label>
							<input
								value={zip}
								type="text"
								id="zip"
								maxLength="5"
								onChange={e => setZip(e.target.value)}
							/>
						</div>
					</div>
				</fieldset>
				<fieldset className={style.fieldset}>
					<legend>Shipping</legend>
					<select
						value={select}
						onChange={e => setSelect(e.target.value)}
						className={style.selectShip}
					>
						<option>Select your option</option>
						<option value="Delivered to adress">Delivered to adress</option>
						<option value="Pick up at Auto Dealership">
							Pick up at Auto Dealership
						</option>
					</select>
				</fieldset>
				<fieldset className={style.fieldset}>
					<legend>Payment Details</legend>
					<label htmlFor="card">Name on Card</label>
					<input type="text" name="card" id="card" />
					<label htmlFor="ccn">Credit Card Number</label>
					<input id="ccn" type="text" name="ccn" maxLength="19" />
					<div className={style.inputContainer}>
						<div className={`${style.smallInput} ${style.leftInput}`}>
							<label htmlFor="valid">Valid through</label>
							<input type="text" name="valid" id="valid" maxLength="5" />
						</div>
						<div className={style.smallInput}>
							<label htmlFor="cvc">CVC code</label>
							<input type="text" name="cvc" id="cvc" maxLength="3" />
						</div>
					</div>
					<div className={style.dateContainer}>
						<label htmlFor="date">Today's Date:</label>
						<input
							value={date}
							type="date"
							id="date"
							name="date"
							onChange={e => setDate(e.target.value)}
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className={style.totalPriceText}>
						<p>
							<strong>Total Price:</strong> ${totalPrice}
						</p>
					</div>
				</fieldset>
				<fieldset>
					<button className={style.checkoutButton} type="submit">
						Proceed to Checkout
					</button>
				</fieldset>
			</form>
		</div>
	);
};

export default CheckoutForm;
