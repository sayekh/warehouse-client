import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({ isLogged: false });

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
	const { user, setUser } = useContext(UserContext);
	return { user, setUser };
};