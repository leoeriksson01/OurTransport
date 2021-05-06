import style from "../css/WelcomeMessage.module.css";

const WelcomeMessage = () => {
	return (
		<div className={style.message_container}>
			<div className={style.name_status_wrapper}>
				<div className={style.name_wrapper}>
					<h3 className={style.name}>Bilgagnat</h3>
				</div>
				<div className={style.status}></div>
			</div>
			{/* /.name_status_wrapper */}

			<p className={style.email}>
				Email: <span className={style.span}>Bilgagnat@contact.com</span>
			</p>
			<p className={style.message}>
				Message:{" "}
				<span className={style.span}>
					Welcome to Bilgagnat! Feel free to message us if you have any
					questions or concerns!
				</span>
			</p>
		</div>
	);
};

export default WelcomeMessage;
