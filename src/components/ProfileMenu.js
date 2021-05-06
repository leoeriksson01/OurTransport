import style from "../css/ProfileMenu.module.css";
import { NavLink } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import LoginModal from "../components/Login";
import SignUpModal from "../components/SignUp";

const ProfileMenu = ({ location }) => {
	const { isLoggedIn, handleLogout } = useContext(UserContext);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const [signupModalOpen, setSignupModalOpen] = useState(false);

	const url = location.state?.url ?? location.pathname;

	// If user is not logged in, redirects to Unauthorized page.
	const handleContactLink = () => {
		window.scrollTo(0, document.body.scrollHeight);
	};

	// Logged in menu
	const loggedInMenu = (
		<div className={style.logged_in_menu}>
			<div className={style.order_link_wrapper}>
				<NavLink exact to="profile" className={style.a}>
					My Profile
				</NavLink>

				<br />

				<NavLink exact to="/myorders" className={style.a}>
					My Orders
				</NavLink>

				<br />
				<NavLink
					exact
					to="/about"
					onClick={handleContactLink}
					className={style.a}
				>
					Help & Contact
				</NavLink>
			</div>
			<hr className={style.hr} />
			<div className={style.button_logout_wrapper}>
				<button onClick={handleLogout} className={style.button_logout}>
					Log out
				</button>
			</div>
		</div>
	);

	// Logged out menu
	const loggedOutMenu = (
		<div className={style.logged_out_menu}>
			<div className={style.button_login_wrapper}>
				<button
					onClick={() => setLoginModalOpen(true)}
					className={style.button_login}
				>
					Log in
				</button>
			</div>
			<hr className={style.hr} />
			<div className={style.registration_wrapper}>
				<p className={style.registration_text}>
					<span className={style.register}>Not a member?</span>
					<NavLink
						className={style.a}
						exact
						to="#"
						onClick={() => setSignupModalOpen(true)}
					>
						Register now
					</NavLink>
				</p>
			</div>
		</div>
	);

	return (
		<div className={style.profile_menu_wrapper}>
			<LoginModal url={url} open={loginModalOpen} setOpen={setLoginModalOpen} />
			<SignUpModal open={signupModalOpen} setOpen={setSignupModalOpen} />
			<div className={style.profile_menu_content}>
				{isLoggedIn() ? (
					<div className={style.profile_menu_content}>{loggedInMenu}</div>
				) : (
					<div className={style.profile_menu_content}>{loggedOutMenu}</div>
				)}
			</div>
		</div>
	);
};

export default ProfileMenu;
