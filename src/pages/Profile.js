import style from "../css/Profile.module.css";
import MessageList from "../components/MessageList";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileInformation from "../components/ProfileInformation";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import Unauthorized from "../components/http/Unauthorized";

const Profile = () => {
	const { user, isLoggedIn } = useContext(UserContext);

	// If user is not logged in, redirects to Unauthorized page.
	if (isLoggedIn() === false) {
		return <Unauthorized />;
	}

	return (
		<div className={style.profile_container}>
			<div className={style.profile_content}>
				<div className={style.greeting_text}>
					<h2>Hello {user?.name}</h2>
					<p>
						On "My Profile" you can edit Profile and view your Order History and
						Messages
					</p>
				</div>
				{/* /.greeting_text */}
				<hr className={style.hr} />
				<div className={style.profile_information_wrapper}>
					<ProfileInformation />
				</div>

				<div className={style.messages}>
					<h3 className={style.messages_header}>Messages</h3>
					<div className={style.message_list}>
						<MessageList />
					</div>
					{/* ./messages */}
				</div>
			</div>
			<div className={style.profile_sidebar_wrapper}>
				<ProfileSidebar />
			</div>
		</div>
	);
};

export default Profile;
