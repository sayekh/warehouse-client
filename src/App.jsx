import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import AuthBox from "./pages/AuthBox/AuthBox";
import ProductsList from "./pages/ProductList/ProductsList";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
	return (
		<Routes>
			<Route path="/register" element={<AuthBox />} index />
			<Route path="/login" element={<AuthBox />} />
			<Route path="/products" element={<ProductsList />} />
			<Route path="/products/:id" element={<ProductDetail />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
