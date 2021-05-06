import style from "../css/MessageList.module.css";
import WelcomeMessage from "./WelcomeMessage";
import Messages from "./Messages";

const MessageList = () => {
	return (
		<div className={style.message_list}>
			<WelcomeMessage />
			<Messages />
		</div>
	);
};

export default MessageList;
