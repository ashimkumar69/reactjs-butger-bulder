import React from "react";
import cssClasses from "./BuildControl.css";

const buildControl = (props) => (
  <div className={cssClasses.BuildControl}>
    
    <div className={cssClasses.Label}>{props.lebel}</div>
    <button
      className={cssClasses.Less}
      onClick={props.remove}
      disabled={props.disable}
    >
      Less
    </button>
    <button className={cssClasses.More} onClick={props.add}>
      More
    </button>
  </div>
);
export default buildControl;
