import { useState } from "react";
import styles from "./AuthBox.module.css";
import { registerSchema } from "./../validation/registerSchema.js";
import logo from "./../assets/logo.png";
import api from "./../api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie.js";
import { useUserContext } from "../context/user.jsx";

function LoginForm({ data, onChange, onSubmit, errors }) {
	return (
		<div className={styles.formContent}>
			{/* username */}
			<input
				type="text"
				placeholder="نام کاربری"
				name="username"
				value={data.username}
				onChange={onChange}
			/>
			{errors.username && <p className={styles.error}>{errors.username}</p>}

			{/* password */}
			<input
				type="password"
				placeholder="رمز عبور"
				name="password"
				value={data.password}
				onChange={onChange}
			/>
			{errors.password && <p className={styles.error}>{errors.password}</p>}

			<button onClick={onSubmit}>ورود</button>
		</div>
	);
}

function RegisterForm({ data, onChange, onSubmit, errors }) {
	return (
		<div className={styles.formContent}>
			{/* username */}
			<input
				type="text"
				placeholder="نام کاربری"
				name="username"
				value={data.username}
				onChange={onChange}
			/>
			{errors.username && <p className={styles.error}>{errors.username}</p>}

			{/* password */}
			<input
				type="password"
				placeholder="رمز عبور"
				name="password"
				value={data.password}
				onChange={onChange}
			/>
			{errors.password && <p className={styles.error}>{errors.password}</p>}

			{/* confirmPassword */}
			<input
				type="password"
				placeholder="تکرار رمز عبور"
				name="confirmPassword"
				value={data.confirmPassword}
				onChange={onChange}
			/>
			{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

			{/* دکمه ثبت */}
			<button onClick={onSubmit}>ثبت نام</button>
		</div>
	);
}

export default function AuthBox() {
	const [isRegister, setIsRegister] = useState(true);
	const { setUser } = useUserContext();
	const [data, setData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRegister = async () => {
		const isValid = await validation(data);
		if (isValid) {
			try {
				const response = await api.post("/auth/register", {
					username: data.username,
					password: data.password,
				});

				if (response.status === 201) {
					// toast.success("User registered successfully");
					toast.success("ثبت نام با موفقیت انجام شد.");
					setTimeout(() => {
						handleLogin("fromRegister");
					}, 500);
				}
			} catch (err) {
				if (err.response && err.response.status === 400) {
					setErrors({ username: "این کاربر وجود دارد" });
				} else {
					console.error("Unexpected error:", err);
					toast.error("somthing wrong");
				}
			}
		} else {
			toast.error("ابتدا فیلد های اشتباه را تصحیح کنید.");
		}
	};

	const handleLogin = async (fromRegister) => {
		setIsRegister(false);
		const updatedData = {
			...data,
			confirmPassword: data.password,
		};
		setData(updatedData);

		let isValid = true;
		console.log(!fromRegister);
		if (!fromRegister) {
			isValid = await validation(updatedData);
		}
		if (isValid) {
			setErrors({});
			try {
				const response = await api.post("/auth/login", {
					username: data.username,
					password: data.password,
				});
				if (response.status === 200) {
					// toast.success("User logged in successfully");
					toast.success("ورود با موفقیت انجام شد");
					setCookie("token", response?.data.token, 3);
					setUser({ isLogged: true });
					setTimeout(() => {
						seeTheList();
					}, 1000);
				}
			} catch (err) {
				if (err.response && err.response.status === 400) {
					setErrors({ username: "کاربر معتبر نیست" });
				} else {
					console.error("Unexpected error:", err);
					toast.error("somthing went wrong");
				}
			}
		} else {
			toast.error("ابتدا فیلد های اشتباه را تصحیح کنید.");
		}
	};
	const validation = async (data) => {
		setErrors({});
		try {
			await registerSchema.validate(data, { abortEarly: false });
			return true;
		} catch (err) {
			if (err.name === "ValidationError") {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
				return false;
			}
		}
	};
	const seeTheList = () => {
		navigate("/products");
	};

	return (
		<div className={styles.wrapper}>
			<ToastContainer />
			<div className={styles.card}>
				<div className={styles.logo}>
					<img src={logo} alt="logo" />
				</div>
				<h3 className={styles.title}>{isRegister ? "فرم ثبت نام" : "فرم ورود"}</h3>

				{isRegister ? (
					<RegisterForm data={data} onChange={handleChange} onSubmit={handleRegister} errors={errors} />
				) : (
					<LoginForm
						data={data}
						onChange={handleChange}
						onSubmit={() => handleLogin()}
						errors={errors}
					/>
				)}

				<p
					className={styles.toggle}
					onClick={() => {
						setIsRegister(!isRegister);
						setErrors({});
					}}
				>
					{isRegister ? "حساب کاربری دارید؟" : "ایجاد حساب کاربری؟"}
				</p>
				<p className={styles.toggle} onClick={seeTheList}>
					مشاهده لیست محصولات
				</p>
			</div>
		</div>
	);
}
