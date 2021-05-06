import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState();

	// Parse users from localStorage on mount
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")) ?? null);
	}, []);

	//  Every time user update, save it in localStorage
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	// If user object exists, user is logged in
	function isLoggedIn() {
		return Boolean(user);
	}

	function login(user = null) {
		setUser(user);
	}

	// Get localStorage key that belongs to logged in user, or provided user
	function getForeignTable(key = "", userArg = null) {
		const data = JSON.parse(localStorage.getItem(key)) ?? [];
		return data.filter(
			item =>
				"email" in item &&
				item.email === (userArg ? userArg?.email : user?.email)
		);
	}

	// Get messages from logged in user, or user of argument
	function getMessages(userArg) {
		return getForeignTable("messages", userArg);
	}

	// Get orders from logged in user, or user of argument
	function getOrders(userArg) {
		return getForeignTable("orders", userArg);
	}

	// Logout
	function handleLogout() {
		setUser(null);
	}

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				handleLogout,
				user,
				setUser,
				login,
				getMessages,
				getOrders,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
