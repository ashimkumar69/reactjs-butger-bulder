import React from "react";
import cssClasses from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { lebel: "Salad", type: "salad" },
  { lebel: "Bacon", type: "bacon" },
  { lebel: "Cheese", type: "cheese" },
  { lebel: "Meat", type: "meat" },
];
const buildControls = (props) => (
  <div className={cssClasses.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.lebel}
        lebel={control.lebel}
        add={() => props.ingredientAdded(control.type)}
        remove={() => props.ingredientRemoved(control.type)}
        disable={props.disable[control.type]}
      />
    ))}
    <button
      onClick={props.ordered}
      className={cssClasses.OrderButton}
      disabled={!props.purchasable}
    >
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
