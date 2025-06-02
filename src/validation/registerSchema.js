import * as yup from "yup";

export const registerSchema = yup.object().shape({
	username: yup.string().required("فیلد اجباری است"),
	password: yup.string().required("فیلد اجباری است"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "رمز عبورها باید برابر باشند")
		.required("فیلد اجباری است"),
});
