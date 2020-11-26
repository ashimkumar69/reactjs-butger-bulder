import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Ui/Button/Button";
const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((inkey) => {
    return (
      <li key={inkey}>
        <span style={{ textTransform: "capitalize" }}>{inkey}</span>:{" "}
        {props.ingredients[inkey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delecious Burgure With Following Ingrediant:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Burger Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.modalClosed}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default orderSummary;
