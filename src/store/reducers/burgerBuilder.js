import * as actionsType from "../actions/actionTypes";
import { updateObject } from "../../sheard/utility";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building:false
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building:true
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building:true
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_INGREDIENT:
      return addIngredients(state, action);
    case actionsType.REMOVE_INGREDIENT:
      return removeIngredients(state, action);
    case actionsType.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building:false
      });

    case actionsType.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
