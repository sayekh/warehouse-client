import React from "react";

function Modal({ content, onClose }) {
	const [product, setproduct] = useState(
		content ? content : { id: "", name: "", price: 0, quantity: 0 }
	);
	return <div>Modal</div>;
}

export default Modal;
