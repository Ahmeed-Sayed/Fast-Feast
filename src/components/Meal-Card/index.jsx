import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
export const MealCard = (item) => {
  const dispatch = useDispatch();
  return (
    <div sx={{ maxWidth: 345 }} className="meal-item">
      <img src={`http://localhost:3000/${item.image}`} title={item.name} />
      <div>
        <h3>{item.name}</h3>
        <span className="meal-item-price"> {item.price} </span>
        <p className="meal-item-description">{item.description}</p>
      </div>
      <div className="meal-item-actions">
        <button
          className="button"
          size="small"
          onClick={() => dispatch(addToCart(item))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
