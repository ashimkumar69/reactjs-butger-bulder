import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Orders extends Component {
  componentDidMount() {
    this.props.onfetchOrder(this.props.token, this.props.userId);
  }

  render() {
    let orders = this.props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        totalPrice={order.totalPrice}
      />
    ));
    if (this.props.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onfetchOrder: (token, userId) => {
      dispatch(actions.fetchOrder(token, userId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
