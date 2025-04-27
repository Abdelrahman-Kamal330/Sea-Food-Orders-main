import React, { useContext, useState } from "react";
import { CartContext } from "../App";

export const Cart = () => {
  const { cartList, meals, toggleCartItem } = useContext(CartContext);

  const selectedMeals = meals.filter((meal) => cartList.includes(meal.idMeal));

  const price = cartList.length * 250;

  const [checked, setChecked] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const isFormValid = () => {
    return (
      userInfo.name !== "" && userInfo.email !== "" && userInfo.address !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all fields.");
    } else {
      cartList.length = 0
      alert("Your order has submited!");
    }
  };

  return (
    <div className="cart" style={{ height: "100vh" }}>
      <div className="orders">
        <h2>Your Cart</h2>
        {selectedMeals.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          selectedMeals.map((meal) => (
            <div className="card">
              <div>
                <img src={meal.strMealThumb} width="100" alt={meal.strMeal} />
                <div className="d-flex flex-column gap-1">
                  <h5>{meal.strMeal}</h5>
                  <span>250$</span>
                </div>
              </div>
              <button onClick={() => toggleCartItem(meal.idMeal)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h2>Cart Summary</h2>
        <div className="card p-2">
          Total price: {price}$
          <button
            className="btn border-none mt-5 checkout"
            onClick={() => setChecked(!checked)}
          >
            Check Out {price}$
          </button>
          <hr />
          <div style={{ display: checked ? "block" : "none" }}>
            <h5>Enter your info</h5>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Enter the Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Enter the Email"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Enter the Address"
                />
              </div>
              <button
                type="submit"
                className="checkout btn"
                disabled={!isFormValid()}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
