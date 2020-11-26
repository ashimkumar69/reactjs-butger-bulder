import React from "react";
import cssClasses from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const navigationItem = (props) => (
  <li className={cssClasses.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={cssClasses.active}
    >
      {props.children}
    </NavLink>
  </li>
);
export default navigationItem;
