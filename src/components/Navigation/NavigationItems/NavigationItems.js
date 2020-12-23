import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import cssClasses from "./NavigationItems.css";
const navigationItems = (props) => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    )}
  </ul>
);
export default navigationItems;
