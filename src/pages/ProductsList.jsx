import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../utils/cookie";
import { useUserContext } from "../context/user";
function ProductsList() {
	const {
		user: { isLogged },
		setUser,
	} = useUserContext();

	useEffect(() => {
		if (getCookie("token")) {
			setUser({ isLogged: true });
		} else {
			toast("برای حذف و اضافه محصول لاگ این رو انجام دهید");
		}
	}, []);

	return (
		<div>
			<ToastContainer />
			ProductsList
		</div>
	);
}

export default ProductsList;
