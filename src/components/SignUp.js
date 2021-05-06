import React, { useState, useContext } from "react";
import style from "../css/SignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UsersContext } from "../components/contexts/UsersContext";
import useOnclickOutside from "react-cool-onclickoutside";
import { UserContext } from "./contexts/UserContext";

function SignUp({ open, setOpen }) {

	//useStates for every input field, used with onChange event handler in form
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [address, setAddress] = useState("");
	const [county, setCounty] = useState("");
	const [zip, setZip] = useState("");

	//imported library, closes modal when clicking outside container
	const container = useOnclickOutside(close);

	//closes modal
	function close() {
		setOpen(false);
	}

	const { createUser } = useContext(UsersContext);
	const { login, isLoggedIn } = useContext(UserContext);

	//if user is logged in, nothing is returned
	if (isLoggedIn()) {
		return null;
	}

	//when registered, saves user data into createUser, and logs in user
	//closes modal 
	function register(e) {
		e.preventDefault();
		const user = { name, email, password, address, county, zip };
		createUser(user);
		login(user);
		close();
	}

	return (
		<>
			{/*Opens SignUp modal*/}
			{open && (
				<div id={style.signUpBackground}>
					<div id={style.SignUpContainer} ref={container}>
						<div onClick={close} className={style.close}>
							<FontAwesomeIcon className={style.close_icon} icon={faTimes} />
						</div>
						<form id={style.signUpForm} onSubmit={register}>
							<h1>Sign up</h1>
							<label htmlFor="name">First and last name</label>
							<input
								required
								type="text"
								placeholder="Enter your name"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<label htmlFor="email">Email</label>
							<input
								required
								type="email"
								value={email}
								placeholder="Enter your email"
								onChange={e => setEmail(e.target.value)}
							/>
							<label htmlFor="password" className={style.formLabel}>
								Password
							</label>
							<input
								required
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<label htmlFor="password" className={style.formLabel}>
								Confirm password
							</label>
							<input
								required
								type="password"
								placeholder="Confirm your password"
								value={passwordConfirmation}
								onChange={e => setPasswordConfirmation(e.target.value)}
							/>
							<label htmlFor="name">Address</label>
							<input
								required
								type="text"
								placeholder="Enter your address"
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
							<div id={style.countyZip}>
								<div id={style.smallColumn}>
									<label htmlFor="county">County</label>
									<input
										required
										type="text"
										placeholder="Enter county"
										id={style.formInput}
										value={county}
										onChange={e => setCounty(e.target.value)}
									/>
								</div>
								<div id={style.smallColumn}>
									<label htmlFor="zip">Zip Code</label>
									<input
										required
										type="number"
										placeholder="Enter zip"
										id={style.formInput}
										value={zip}
										onChange={e => setZip(e.target.value)}
									/>
								</div>
							</div>
							<button type="submit" id={style.signUpBtn}>Sign up</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default SignUp;
