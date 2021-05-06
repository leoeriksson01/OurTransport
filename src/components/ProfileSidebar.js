import style from "../css/ProfileSidebar.module.css";
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {

	// If user clicks on NavLink: "Help & Contact" user is redirected to Contact From on "About Us" page
	const handleContactLink = () => {
		window.scrollTo(0, document.body.scrollHeight);
	};
	return (
		<div className={style.profile_sidebar}>
			<div className={style.header_text_wrapper}>
				<NavLink className={style.a} exact to="/profile">
					<h2 className={style.header_text}>My Profile</h2>
				</NavLink>
			</div>
			<ul className={style.links}>
				<li>
					<NavLink className={style.a} exact to="/myorders">
						My Orders
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						to="/about"
						onClick={handleContactLink}
						className={style.a}
					>
						Help & Contact
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default ProfileSidebar;
