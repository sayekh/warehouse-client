import { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import deleteIconModal from "./../../assets/deleteIconModal.png";

function Modal({ content, onClose, type, onSuccess }) {
	const [product, setproduct] = useState(content);
	const timerRefs = useRef([]);
	useEffect(() => {
		return () => {
			timerRefs.current.forEach(clearTimeout);
			toast.dismiss();
		};
	}, []);
	const changeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setproduct((ps) => ({ ...ps, [name]: value }));
	};
	const deleteProduct = async (id) => {
		try {
			const response = await api.delete(`/products/${id}`);
			if (response.status === 204) {
				toast.success("محصول با موفقیت حذف شد");
				onSuccess();
				timerRefs.current.push(
					setTimeout(() => {
						onClose();
					}, 2000)
				);
			}
			// onClose();
		} catch (error) {
			const status = error.response?.status;
			if (status === 403 || status === 401) {
				toast.error("دسترسی غیرمجاز; توکن نامعتبر یا منقضی شده است.");
			} else if (status === 404) {
				toast.error("محصول یافت نشد.");
			} else {
				toast.error("خطای ناشناخته‌ای رخ داد.");
			}
			console.log("خطا:", error);
		}
	};
	const addProduct = async () => {
		try {
			const response = await api.post("/products", product);
			if (response.status === 201) {
				toast.success("محصول با موفقیت اضافه شد");
				onSuccess();
				timerRefs.current.push(
					setTimeout(() => {
						onClose();
					}, 2000)
				);
			}
			// onClose();
		} catch (error) {
			const status = error.response?.status;

			if (status === 401) {
				toast.error("دسترسی غیرمجاز; توکن یافت نشد یا نامعتبر است.");
			} else if (status === 403) {
				toast.error("توکن نامعتبر یا منقضی شده است.");
			} else if (status === 400) {
				toast.error("اطلاعات ارسال‌شده نامعتبر است.");
			} else {
				toast.error("خطای ناشناخته‌ای رخ داد.");
			}

			console.log("خطا:", error);
		}
	};

	const editProduct = async (id) => {
		try {
			const response = await api.put(`/products/${id}`, product);
			if (response.status === 200) {
				toast.success("محصول با موفقیت ویرایش شد");
				onSuccess();
				timerRefs.current.push(
					setTimeout(() => {
						onClose();
					}, 2000)
				);
			}
			// onClose();
		} catch (error) {
			console.log(error);
			const status = error.response?.status;
			if (status === 403) {
				toast.error("دسترسی غیرمجاز; توکن نامعتبر یا منقضی شده است.");
			} else if (status === 401) {
				toast.error("دسترسی غیرمجاز; توکن یافت نشد یا نامعتبر است.");
			} else if (status === 404) {
				toast.error("محصول یافت نشد.");
			}
		}
	};
	return (
		<div className={styles.container}>
			<ToastContainer />
			<div className={styles.card}>
				<div className={styles.header}>
					{/* {type === "delete" && <img src={deleteIconModal} alt="" />} */}
					{type === "delete" && <img src={deleteIconModal} alt="" className={styles.deleteIconModal} />}
					{type === "add"
						? "ایجاد محصول جدید"
						: type === "edit"
						? "ویرایش اطلاعات"
						: "ایا از حذف این محصول مطمعئنید؟"}
				</div>
				<div className={styles.contents}>
					<p>نام کالا</p>
					<input type="text" value={product.name} name="name" onChange={(e) => changeHandler(e)} />
					<p>تعداد موجودی</p>
					<input
						type="number"
						value={product.quantity}
						name="quantity"
						onChange={(e) => changeHandler(e)}
					/>
					<p>قیمت</p>
					<input type="number" value={product.price} name="price" onChange={(e) => changeHandler(e)} />
				</div>
				<div className={styles.actions}>
					{type === "delete" ? (
						<>
							<button onClick={() => deleteProduct(product.id)} style={{ backgroundColor: "#F43F5E" }}>
								حذف
							</button>
							<button className={styles.close} onClick={onClose}>
								لغو
							</button>
						</>
					) : (
						<>
							<button onClick={type === "add" ? addProduct : () => editProduct(product.id)}>
								{type === "add" ? "ایجاد" : "ثبت اطلاعات جدید"}
							</button>
							<button className={styles.close} onClick={onClose}>
								انصراف
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Modal;
