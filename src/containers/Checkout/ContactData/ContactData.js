import React, { Component } from "react";
import Button from "../../../components/Ui/Button/Button";
import cssClasses from "./ContactData.css";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import axios from "../../../axios-order";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postcode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: "Max",
        address: {
          street: "example 2",
          zipCode: "3456",
          country: "Germany",
        },
        email: "test@test.com",
      },
      deliveryMethod: "Fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={cssClasses.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={cssClasses.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={cssClasses.Input}
          type="text"
          name="street"
          placeholder="Street Address"
        />
        <input
          className={cssClasses.Input}
          type="text"
          name="postcode"
          placeholder="Postcode Address"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={cssClasses.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
