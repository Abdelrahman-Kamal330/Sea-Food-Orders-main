import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import {Navbar} from "./components/Navbar";
import { createContext, useState, useEffect } from "react";
import {Cart} from "./pages/Cart";
import axios from "axios";

export const CartContext = createContext()

function App() {
  const [meals, setMeals] = useState([]);
  const [cartList, setCartList] = useState([]); 

  
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
      .then((res) => setMeals(res.data.meals));
  });

  return (
    <div>
      <CartContext.Provider value={{ meals, setMeals, cartList, toggleCartItem }}>

        <Router>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/Sea-Food-Orders" />
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
