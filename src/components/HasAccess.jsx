import { useUserContext } from "../context/user";

function HasAccess({ children }) {
	const { isLogged } = useUserContext().user;
	if (isLogged) {
		return children;
	}
}

export default HasAccess;
