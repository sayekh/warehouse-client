import { useUserContext } from "../../context/user.jsx";

function HasAccess({ children }) {
	const { isLogged } = useUserContext().user;
	if (isLogged) {
		return children;
	}
}

export default HasAccess;
