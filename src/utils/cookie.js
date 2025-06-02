export const setCookie = (name, value, hours) => {
	const now = new Date();
	now.setTime(now.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires" + now.toUTCString();
	document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const getCookie = (name) => {
	//name = "token"
	const cookieName = name + "=";
	//cookieName = "token="
	//document.cookie = "token=abc; user=ali";
	// ca = cookiesArray
	const ca = document.cookie.split(";");
	// ca = ["token=abc", " user=ali"]
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		// c = "token=abc" , "user=ali"
		// If it matches, return the value part (everything after the '=')
		if (c.indexOf(cookieName) === 0) return c.substring(cookieName.length, c.length);
		// "token=abc".subString(6,9)
	}
	return null;
};
