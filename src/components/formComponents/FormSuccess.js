import React from "react";
import emailSent from "../../assets/sent-email.png";
import style from "./ContactForm.module.css";

//component displayed when form is successfully submitted
const FormSuccess = () => {
	return (
		<div id={style.successContainer}>
			<div id={style.successDiv}>
				<div id={style.successMessage}>
					We have received your message and will get back to you soon via your
					email or profile inbox!
				</div>
				<img
					src={emailSent}
					alt="Message was sent successfully."
					id={style.formImage}
				/>
			</div>
		</div>
	);
};

export default FormSuccess;
