import React, { useState } from "react";
import style from "./ContactForm.module.css";


//useStates for every input field, used with onChange event handler in form
function ContactForm({ submit }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");


//handleSubmit function, used with onSubmit. Saves name, email, message to localStorage
//To be used on Profile Page
	function handleSubmit(e) {
		e.preventDefault();
		const messages = JSON.parse(localStorage.getItem("messages")) ?? [];
		messages.push({ name, email, message });
		localStorage.setItem("messages", JSON.stringify(messages));
		submit();
	}

	return (
		<div id={style.formContainer}>
			<form id={style.contactForm} onSubmit={handleSubmit}>
				<h1 id={style.contactHeading}>
					Get in touch! Send us a message below:
				</h1>
				<div id={style.formInputs}>
					<label htmlFor="username" id={style.formLabel}>
						Name:
					</label>
					<input
						type="text"
						id={style.formInput}
						placeholder="Enter your name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div id={style.formInputs}>
					<label htmlFor="email" id={style.formLabel}>
						Email:
					</label>
					<input
						type="email"
						id={style.formInput}
						placeholder="Enter your email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div id={style.formInputs}>
					<label htmlFor="message" id={style.formLabel}>
						Message:
					</label>
					<textarea
						type="textarea"
						name="message"
						id={style.formInputMessage}
						placeholder="Enter your message"
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
				</div>
				<br></br>
				<button id={style.formInputBtn} type="submit">
					Send message
				</button>
			</form>
		</div>
	);
}

export default ContactForm;
