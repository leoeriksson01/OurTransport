import style from "../css/ProfileInformation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faCreditCard,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import NotFound from "./http/NotFound";

const ProfileInformation = () => {
	const { user } = useContext(UserContext);

	// Toggles show/hide password when clicked.
	const togglePassword = e => {
		const type = e.target.getAttribute("type");
		e.target.setAttribute("type", type === "password" ? "text" : "password");
	};

	// If "user" variable is not stored in local storage, returns null
	if (!user) {
		return null;
	}

	// if "user" variable is not stored in local storage, and error msg shows: user = undefined ---> Redirects to NotFound page
	if (!user && user !== undefined) {
		return <NotFound />;
	}

	return (
		<div className={style.profile_information_content}>
			<div className={style.profile_information_header}>
				<h2 className={style.h2}>Profile information</h2>
				<p>
					Here you can edit your profile information. Keeping your information
					up to date helps us verify your account.
				</p>
			</div>
			<hr />
			<div className={style.personal_information}>
				<div className={style.icon_wrapper}>
					<div className={style.icon_user_wrapper}>
						<FontAwesomeIcon icon={faUser} size="2x" />
					</div>
					<div className={style.icon_edit_wrapper}>
						<FontAwesomeIcon icon={faEdit} size="2x" />
					</div>
				</div>
				<div className={style.personal_information_content}>
					<div className={style.personal_information_text}>
						<div className={style.text_wrapper}>
							<p className={style.p}>
								Name: <br />
								<span className={style.span}>{user.name}</span>
							</p>
							<p className={style.p}>
								Address: <br />
								<span className={style.span}>{user.address}</span>
							</p>
						</div>

						<div className={style.text_wrapper}>
							<p className={style.p}>
								County: <br />
								<span className={style.span}>{user.county}</span>
							</p>
							<p className={style.p}>
								Zip Code: <br />
								<span className={style.span}>{user.zip}</span>
							</p>
						</div>
					</div>
					{/* ./personal_information_text */}
				</div>
				{/* /.personal_information_content */}
			</div>
			{/* ./personal_information */}
			<hr />
			<div className={style.login_information}>
				<div className={style.icon_wrapper}>
					<div className={style.icon_login_wrapper}>
						<FontAwesomeIcon icon={faEnvelope} size="2x" />
					</div>
					<div className={style.icon_edit_wrapper}>
						<FontAwesomeIcon icon={faEdit} size="2x" />
					</div>
				</div>

				<div className={style.login_text}>
					<p className={style.p}>
						Email: <br />
						<span className={style.span}>{user.email}</span>
					</p>
					<p className={style.p}>
						Password: <br />
						<input
							className={style.password_input}
							type="password"
							onClick={togglePassword}
							value={user.password}
							readOnly
						/>
					</p>
				</div>
				{/* /.login_text */}
			</div>
			{/* /.login_information */}
			<hr />
			<div className={style.payment_method}>
				<div className={style.icon_wrapper}>
					<div className={style.icon_payment_wrapper}>
						<FontAwesomeIcon icon={faCreditCard} size="2x" />
					</div>
					<div className={style.icon_edit_wrapper}>
						<FontAwesomeIcon icon={faEdit} size="2x" />
					</div>
				</div>

				<div className={style.payment_text_wrapper}>
					<p className={style.payment_text}>No payment method saved</p>
				</div>
				{/* /.payment_text_wrapper */}
			</div>
			{/* /.payment_method */}
		</div>
	);
};

export default ProfileInformation;
