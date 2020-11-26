import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../Ui/Button/Button";
import cssClasses from "./CheckoutSummary.css";
const CheckoutSummary = (props) => {
  return (
    <div className={cssClasses.CheckoutSummary}>
      <h1>We home it test well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
