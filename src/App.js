import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { createContext, useState, useEffect } from "react";
import { Cart } from "./pages/Cart";
import axios from "axios";

export const CartContext = createContext();

function App() {
  const [meals, setMeals] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleCartItem = (id) => {
    setCartList((prevList) =>
      prevList.includes(id)
        ? prevList.filter((mealId) => mealId !== id)
        : [...prevList, id]
    );
  };

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => {
        setMeals(res.data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seafood meals:", err);
        setError(err.message || "An unexpected error occurred.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <CartContext.Provider
        value={{ meals, setMeals, cartList, toggleCartItem }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Cart />} path="/cart" />
          </Routes>
          <footer>
            © 2025 Seafood Haven. All rights reserved. Unauthorized use is
            prohibited.
          </footer>
        </Router>
      </CartContext.Provider>
    </div>
  );
}

export default App;
