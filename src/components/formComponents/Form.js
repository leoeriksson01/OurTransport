import React, { useState } from "react";
import ContactForm from "./ContactForm";
import FormSuccess from "./FormSuccess";

//shows ContactForm when not submitted, when submitted it shows FormSuccess
const Form = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	return (
		<div className="form-container">
			{!isSubmitted ? (
				<ContactForm submit={() => setIsSubmitted(true)} />
			) : (
				<FormSuccess />
			)}
		</div>
	);
};

export default Form;
