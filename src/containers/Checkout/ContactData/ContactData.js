import React, { Component } from "react";
import Button from "../../../components/Ui/Button/Button";
import cssClasses from "./ContactData.css";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import axios from "../../../axios-order";
import Input from "../../../components/Ui/Form/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../sheard/utility";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        tuched: false,
      },

      street: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        tuched: false,
      },
      zipCode: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        tuched: false,
      },
      country: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        tuched: false,
      },

      email: {
        elemetType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        tuched: false,
      },

      deliveryMethod: {
        elemetType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    loading: false,
    fromIsValid: false,
  };

  inputChangedHandler = (e, inputidentifier) => {
    const updatedOrderFormKey = updateObject(
      this.state.orderForm[inputidentifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.orderForm[inputidentifier].validation
        ),
        tuched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputidentifier]: updatedOrderFormKey,
    });

    let formIsValid = true;

    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, fromIsValid: formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formDataIdentifier in this.state.orderForm) {
      formData[formDataIdentifier] = this.state.orderForm[
        formDataIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.ttp,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            isValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            tuched={formElement.config.tuched}
            elemetType={formElement.config.elemetType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.fromIsValid}>
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
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    ttp: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
