import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import styles from "./ProductDetail.module.css";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";

function ProductDetail() {
	const [data, setData] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await api.get(`/products/${params.id}`);
				if (response.status === 200) {
					setData(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getProduct();
	}, [params.id]);

	if (!data) {
		return (
			<div className={styles.loadingWrapper}>
				<div className={styles.spinner}></div>
				<p className={styles.loadingText}>در حال بارگذاری...</p>
			</div>
		);
	}

	return (
		<>
			<div className={styles.card}>
				<h1 className={styles.title}>
					<CategorySharpIcon fontSize="large" />
					<span>{data.name}</span>
				</h1>

				<div className={styles.detailRow}>
					<span className={styles.label}>شناسه کالا:</span>
					<span className={styles.value}>{data.id}</span>
				</div>

				<div className={styles.detailRow}>
					<span className={styles.label}>قیمت:</span>
					<span className={styles.value}>{data.price.toLocaleString()} تومان</span>
				</div>

				<div className={styles.detailRow}>
					<span className={styles.label}>موجودی:</span>
					<span className={styles.value}>{data.quantity}</span>
				</div>
			</div>
			<button className={styles.back} onClick={() => navigate("/products")}>
				بازگشت
			</button>
		</>
	);
}

export default ProductDetail;
