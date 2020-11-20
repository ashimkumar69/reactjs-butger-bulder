import React from "react";
import cssClasses from "./Backdrop.css";
const backdrop = (props) =>
  props.show ? (
    <div onClick={props.closed} className={cssClasses.Backdrop}></div>
  ) : null;
export default backdrop;
