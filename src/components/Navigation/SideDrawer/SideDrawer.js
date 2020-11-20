import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Ui/Logo/Logo";
import cssClasses from "./SideDrawer.css";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
const sideDrawer = (props) => {
  let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
  if (props.open) {
    attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} closed={props.sideDrawerCloseed} />
      <div className={attachedClasses.join(" ")}>
        <div className={cssClasses.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
