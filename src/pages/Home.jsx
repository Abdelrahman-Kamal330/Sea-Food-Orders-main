import React, { useContext } from "react";
import { CartContext } from "../App";

export const Home = () => {
  const { meals, cartList, toggleCartItem } = useContext(CartContext);

  return (
    <div>
      <div style={{ marginBottom: "200px" }}>
        <section id="hero">
          <div>
            <h1>
              Delicious Meals, <br />
              Delivered Fast
            </h1>
            <p>
              Craving something tasty? Explore a variety of meals and get your
              favorites delivered to your door — hot, fresh, and fast!
            </p>
            <a className="btn" href="#meals">
              Browse Meals
            </a>
          </div>

          <img
            src="https://img.freepik.com/premium-photo/fresh-seafood-raw-shrimps-squids-wooden-board_1339-12045.jpg?ga=GA1.1.407250526.1708023260&semt=ais_hybrid&w=740"
            alt=""
          />
        </section>

        <section id="meals">
          <h3>Our Meals</h3>
          <hr />
          <br />
          <div className="meals-list">
            {meals.map((meal) => {
              const isInCart = cartList.includes(meal.idMeal);
              return (
                <div key={meal.idMeal} className="card">
                  <div>
                    <div style={{ position: "relative" }}>
                      <img
                        src={meal.strMealThumb}
                        className="card-image"
                        alt=""
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          backgroundColor: "#2B2B2B",
                          color: "white",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      >
                        $250
                      </p>
                    </div>

                    <h6 className="card-title">{meal.strMeal}</h6>
                  </div>
                  <button
                    className="btn"
                    style={{ backgroundColor: isInCart ? "red" : "#F25322" }}
                    onClick={() => toggleCartItem(meal.idMeal)}
                  >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
