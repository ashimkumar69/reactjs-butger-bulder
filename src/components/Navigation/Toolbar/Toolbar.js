import React from "react";
import cssClasses from "./Toolbar.css";
import Logo from "../../Ui/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toollbar = (props) => (
  <header className={cssClasses.Toolbar}>
    <DrawerToggle clicked={props.SideDrawerToggle} />
    <div className={cssClasses.Logo}>
      <Logo />
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);
export default toollbar;
