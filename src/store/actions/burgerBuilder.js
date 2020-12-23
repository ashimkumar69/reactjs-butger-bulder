import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
export const addIngredients = (value) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: value,
  };
};
export const removeIngredients = (value) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: value,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const inItIngredients = (ingredients) => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
