import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import CloseMenuIcon from "../assets/menuclose.png";
import Cart from "../assets/cart.png";
import Profile from "../assets/profile.png";
import { ShopCartContext } from "./contexts/ShopCartContext";
import logo from "../assets/logo.jpg";
import style from "../css/Navbar.module.css";
import ShoppingCartList from "./ShoppingCartList";
import ProfileMenu from "./ProfileMenu";
import useOnclickOutside from "react-cool-onclickoutside";

const Navbar = () => {
	const [profileMenu, setProfileMenu] = useState(false);
	const [animateCart, setAnimateCart] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [shoppingCartOpen, setShoppingCartOpen] = useState(false);
	const { counter, shoppingCart } = useContext(ShopCartContext);

	const profile_menu_close = useOnclickOutside(() => setProfileMenu(false));
	const shoppingcart_menu_close = useOnclickOutside(() =>
		setShoppingCartOpen(false)
	);

	const location = useLocation();

	const handleMobileMenu = () => setMobileMenu(mobileMenu => !mobileMenu);

	// Memorize what the previous shopping cart size was
	const cartItemsLength = useRef(shoppingCart.length);

	useEffect(() => {
		if (shoppingCart.length > cartItemsLength.current) {
			setAnimateCart(true);
			setTimeout(() => {
				setAnimateCart(false);
			}, 750); // Match this with the .animate duration amount
		}

		if (shoppingCart.length <= 0) {
			setShoppingCartOpen(false);
		}

		// Save current shopping cart length to compare with the next time the cart update
		cartItemsLength.current = shoppingCart.length;
	}, [shoppingCart]);

	// Toggles shopping cart
	const toggleShoppingCart = () => {
		setShoppingCartOpen(shoppingCartOpen => !shoppingCartOpen);
	};

	// Toggle Profile Menu icon
	const toggleProfileMenu = e => {
		setProfileMenu(profileMenu => !profileMenu);
	};

	return (
		<div className={style.navbar_container}>
			<div className={style.logo_company_title_wrapper}>
				<div className={style.logo_wrapper}>
					<NavLink exact to="/">
						<img className={style.logo_img} src={logo} alt="logo" />
					</NavLink>
				</div>
			</div>
			{/* /.logo_company_title_wrapper */}
			<div className={style.nav_router_menu}>
				<ul
					className={`${style.ul} ${
						mobileMenu ? "" : style.nav_router_ul_none
					}`}
				>
					<li className={style.li}>
						<NavLink className={style.a} exact to="/">
							Home
						</NavLink>
					</li>
					<li className={style.li}>
						<NavLink className={style.a} exact to="/about">
							About
						</NavLink>
					</li>
				</ul>
			</div>
			{/* ./nav_router_container */}

			<div className={style.icons_wrapper}>
				<div className={style.profile_container} ref={profile_menu_close}>
					<div
						className={style.profile_icon_wrapper}
						style={{
							backgroundColor: profileMenu && "#353336",
							borderRadius: profileMenu && "5px 5px 0 0",
						}}
					>
						<img
							onClick={toggleProfileMenu}
							src={Profile}
							alt="profile"
							className={style.profile_icon}
						/>
					</div>
					{/* /.profile_icon_wrapper */}

					<div
						className={`${style.profile_menu_container} ${
							profileMenu ? style.profile_menu_container_index : ""
						}`}
					>
						{profileMenu ? <ProfileMenu location={location} /> : ""}
					</div>
					{/* /.profile_menu_wrapper */}
				</div>
				{/* /.profile_container */}

				<div className={style.cart_container} ref={shoppingcart_menu_close}>
					<div className={style.cart_counter}>
						<img
							onClick={toggleShoppingCart}
							src={Cart}
							alt="cart"
							className={`${style.cart_icon} ${
								animateCart ? style.animate : ""
							}`}
							style={{
								backgroundColor: shoppingCartOpen && "#353336",
								borderRadius: shoppingCartOpen && "5px 5px 0 0",
							}}
						/>
						<div className={style.counter}> {counter} </div>
					</div>
					<div
						className={`${style.shopping_cart_wrapper} ${
							shoppingCartOpen ? style.shopping_cart_wrapper_index : ""
						}`}
						style={{
							backgroundColor: shoppingCartOpen && "#353336",
							borderRadius: shoppingCartOpen && "5px 5px 0 0",
						}}
					>
						<div className={style.shopping_cart_content}>
							{shoppingCartOpen ? <ShoppingCartList /> : ""}
						</div>
						{/* /.shopping_cart_content */}
					</div>
					{/* shopping_cart_wrapper */}
				</div>
				{/* /.cart_container */}

				<div className={style.mobile_menu}>
					{mobileMenu ? (
						<img
							src={CloseMenuIcon}
							alt="close menu"
							className={style.mobile_menu_icon}
							onClick={handleMobileMenu}
						/>
					) : (
						<img
							src={MenuIcon}
							alt="mobile menu"
							className={style.mobile_menu_icon}
							onClick={handleMobileMenu}
						/>
					)}
				</div>
				{/* /.mobile_menu */}
			</div>
			{/* /.icons_wrapper */}
		</div>
		// /.navbar_container
	);
};

export default Navbar;
