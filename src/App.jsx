import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import AuthBox from "./pages/AuthBox";
import ProductsList from "./pages/ProductsList";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Routes>
			<Route path="/register" element={<AuthBox />} />
			<Route path="/login" element={<AuthBox />} />
			<Route path="/products" element={<ProductsList />} />
			{/* <Route path="/products/:id" element={<ProductDetail />} /> */}

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
