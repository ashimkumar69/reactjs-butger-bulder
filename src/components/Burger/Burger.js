import React from "react";
import cssClasses from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { withRouter } from "react-router-dom";
const burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map((inKey) => {
      return [...Array(props.ingredients[inKey])].map((_, i) => {
        return <BurgerIngredient key={inKey + i} type={inKey} />;
      });
    })
    .reduce((preValue, curValue) => {
      return preValue.concat(curValue);
    }, []);
  if (transformIngredients.length === 0) {
    transformIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default withRouter(burger);
