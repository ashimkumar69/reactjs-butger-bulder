import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    totalPrice: 0,
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }

        this.setState({ orders: fetchOrders, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = this.state.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        totalPrice={order.totalPrice}
      />
    ));
    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
