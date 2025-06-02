import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import AuthBox from "./pages/AuthBox";
import ProductsList from "./pages/ProductsList";

function App() {
	return (
		<Routes>
			<Route path="/register" element={<AuthBox />} />
			<Route path="/login" element={<AuthBox />} />
			<Route path="/products" element={<ProductsList />} />
			{/* <Route path="/products/:id" element={<ProductDetail />} /> */}

			{/* <Route
        path="/products/create"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id/edit"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      /> */}

			{/* <Route path="*" element={<NotFound />} /> */}
		</Routes>
	);
}

export default App;
