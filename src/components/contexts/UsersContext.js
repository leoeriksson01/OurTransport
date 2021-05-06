import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
	const [users, setUsers] = useState([]);
	const { user } = useContext(UserContext);

	// Parse user from localStorage on mount
	useEffect(() => {
		setUsers(JSON.parse(localStorage.getItem("users")) ?? []);
	}, []);

	// Every time users update, save it in localStorage
	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	// Find single user
	function findUser(property = "email", value = "") {
		return users.find(user => user[property] === value) ?? null;
	}

	useEffect(() => {
		if (user) {
			// Try to create user if it does not exist
			const createdUser = createUser(user);
			if (!createdUser) {
				// False return means user already exists
				// Update it instead to avoid duplicate
				updateUser(user);
			}
		}
	}, [user]);

	// Update user
	function updateUser(user = {}) {
		setUsers(users =>
			users.map(element =>
				element.email === user.email ? { ...element, ...user } : element
			)
		);
	}

	function createUser(user = {}) {
		// If user already exists, exit
		if (findUser("email", user.email)) {
			return false;
		}
		setUsers(users => [...users, user]); // Create user
		return true;
	}

	// Delete user
	function deleteUser(property = "email", value = "") {
		setUsers(users => users.filter(user => user[property] !== value));
	}

	return (
		<UsersContext.Provider
			value={{
				users,
				setUsers,
				findUser,
				createUser,
				deleteUser,
				updateUser,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
}
