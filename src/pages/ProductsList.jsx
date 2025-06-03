import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../utils/cookie";
import { useUserContext } from "../context/user";
import styles from "./ProductList.module.css";
import HasAccess from "../components/HasAccess";
import milad from "./../assets/milad.png";
import searchIcon from "./../assets/searchIcon.png";
import modiriatKala from "./../assets/modiriatKala.png";
import edit from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.png";
import api from "../api";
function ProductsList() {
	const [search, setSearch] = useState({ name: "", minPrice: null, maxPrice: null });
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState([]);
	const { setUser } = useUserContext();
	const [deleteProducts, setDeleteProducts] = useState([]);
	const thRefs = useRef([]);

	useEffect(() => {
		if (getCookie("token")) {
			setUser({ isLogged: true });
		} else {
			toast("برای حذف و اضافه محصول لاگ این رو انجام دهید");
		}
	}, []);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await api.get("/products", {
					params: {
						name: search.name || undefined,
						minPrice: search.minPrice || undefined,
						maxPrice: search.maxPrice || undefined,
						page,
						limit,
					},
				});
				if (response.status === 200) {
					setData(response.data.data);
				}
			} catch (error) {
				console.log(error);
				setData([]);
			}
		};
		getProducts();
	}, [search.name, search.minPrice, search.maxPrice, page, limit]);

	const initResize = (e, index) => {
		const startX = e.clientX;
		const th = thRefs.current[index];
		const startWidth = th.offsetWidth;

		const onMouseMove = (eMove) => {
			const dx = startX - eMove.clientX;
			const newWidth = startWidth + dx;
			if (newWidth > 40) {
				th.style.width = `${newWidth}px`;
			}
		};

		const onMouseUp = () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};

	return (
		<>
			<ToastContainer />
			<div className={styles.container}>
				<div className={styles.searchSection}>
					<div className={styles.searchInput}>
						<img src={searchIcon} alt="" />
						<input
							type="text"
							value={search.name}
							placeholder="جستجو  کالا"
							onChange={(e) => setSearch((ps) => ({ ...ps, name: e.target.value }))}
						/>
					</div>
					<div className={styles.searchProfile}>
						<img src={milad} alt="img" />
						<p>عنوان مدیر</p>
					</div>
				</div>
				<div className={styles.manageSection}>
					<div className={styles.title}>
						<p>
							<img src={modiriatKala} alt="" />
							مدیریت کالا
						</p>
						<HasAccess>
							<button >افزودن محصول</button>
						</HasAccess>
					</div>
					<div className={styles.list}>
						<table>
							<span className={styles.fakeHeader}></span>
							<thead>
								<tr>
									<HasAccess>
										<th className={styles.thResizable} ref={(el) => (thRefs.current[0] = el)}>
											<div className={styles.resizer} onMouseDown={(e) => initResize(e, 0)}></div>
										</th>
									</HasAccess>
									<th className={styles.thResizable} ref={(el) => (thRefs.current[1] = el)}>
										نام کالا
										<div className={styles.resizer} onMouseDown={(e) => initResize(e, 1)}></div>
									</th>

									<th className={styles.thResizable} ref={(el) => (thRefs.current[2] = el)}>
										موجودی
										<div className={styles.resizer} onMouseDown={(e) => initResize(e, 2)}></div>
									</th>
									<th className={styles.thResizable} ref={(el) => (thRefs.current[3] = el)}>
										قیمت
										<div className={styles.resizer} onMouseDown={(e) => initResize(e, 3)}></div>
									</th>
									<th className={styles.thResizable} ref={(el) => (thRefs.current[4] = el)}>
										شناسه کالا
										<div className={styles.resizer} onMouseDown={(e) => initResize(e, 4)}></div>
									</th>

									<HasAccess>
										<th className={styles.thResizable} ref={(el) => (thRefs.current[5] = el)}>
											<div className={styles.resizer} onMouseDown={(e) => initResize(e, 5)}></div>
										</th>
									</HasAccess>
								</tr>
							</thead>
							<tbody>
								{data.length > 0 ? (
									data.map((product, index) => (
										// <tr key={product.id}>
										<tr key={index}>
											<HasAccess>
												<td>
													<input type="checkbox" />
												</td>
											</HasAccess>
											<td>{product.name}</td>
											<td>{product.quantity}</td>
											<td>{product.price}</td>
											<td>{product.id}</td>
											<HasAccess>
												<td>
													<img src={edit} alt="" />
													<img src={deleteIcon} alt="" />
												</td>
											</HasAccess>
										</tr>
									))
								) : (
									<tr key="no-data">
										<td colSpan="4">محصولی یافت نشد</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductsList;
