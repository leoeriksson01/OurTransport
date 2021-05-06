import style from "../css/Messages.module.css";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";

const Messages = () => {
	const { getMessages } = useContext(UserContext);

	return getMessages().map((msg, i) => (
		<div className={style.message_container} key={i}>
			<div className={style.name_status_wrapper}>
				<div className={style.name_wrapper}>
					<h3 className={style.name}>{msg.name}</h3>
				</div>
				<div className={style.status}>
					<p className={style.pending}>Pending</p>
				</div>
			</div>
			{/* /.name_status_wrapper */}

			<p className={style.email}>
				Email: <span className={style.span}>{msg.email}</span>
			</p>
			<p className={style.message}>
				Message: <span className={style.span}>{msg.message}</span>
			</p>
		</div>
	));
};

export default Messages;
