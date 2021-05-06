import React, { useContext, useState } from "react";
import style from "../css/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/contexts/UserContext";
import { UsersContext } from "../components/contexts/UsersContext";
import useOnclickOutside from "react-cool-onclickoutside";
import { useHistory } from "react-router-dom";
import SignUpModal from "../components/SignUp";

const Login = ({ url, open, setOpen }) => {
	const { isLoggedIn, login } = useContext(UserContext);
	const [signupModalOpen, setSignupModalOpen] = useState(false);
	const { users } = useContext(UsersContext);
	const container = useOnclickOutside(close);
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	if (isLoggedIn()) {
		return null;
	}

	function close() {
		setOpen(false);
	}

	function handleLogin(e) {
		e.preventDefault();

		//Checks if user input (email and password) is valid/registrered 

		const validation = users.find(
			user => email === user.email && password === user.password
		);

		const getUser = users.find(user => {
			return user.email === email;
		});

		if (validation) {
			login(getUser);
			close();
		} else {
			setErrorMsg("Wrong email or password. Try again!");
		}

		if (url) {
			// User is always redirected to where they were
			history.push(url);
		}
	}

	return (
		<div>
			{open && (
				<div className={style.modal}>
					<div className={style.modal_content} ref={container}>
						<div onClick={close} className={style.close}>
							<FontAwesomeIcon className={style.close_icon} icon={faTimes} />
						</div>
						<form onSubmit={handleLogin} className={style.login_form}>
							<h1>Login</h1>
							<p className={style.errorMsg}>{errorMsg}</p>
							<label htmlFor="email">Email</label>
							<input
								required
								type="email"
								placeholder="Enter your email"
								value={email}
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

							<button type="submit">Login</button>
						</form>
						<div className={style.register}>
							<h2>Not a member?</h2>
							<button
								className={style.a}
								onClick={() => setSignupModalOpen(true)}
							>
								Register now
							</button>
						</div>
					</div>
				</div>
			)}
			<SignUpModal open={signupModalOpen} setOpen={setSignupModalOpen} />
		</div>
	);
};

export default Login;
