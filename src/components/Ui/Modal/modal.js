import React, { Component } from "react";
import cssClasses from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // componentDidUpdate() {
  //   console.log("[Modal.js] componentDidUpdate");
  // }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} closed={this.props.closed} />
        <div
          className={cssClasses.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
