import React from "react";
import BurgerLogo from "../../../assets/images/burger-logo.png";
import cssClasses from "./Logo.css";
const logo = (props) => (
  <div className={cssClasses.Logo}>
    <img src={BurgerLogo} alt="MyBurger"></img>
  </div>
);
export default logo;
