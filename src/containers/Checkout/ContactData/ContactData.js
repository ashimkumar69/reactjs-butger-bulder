import React, { Component } from "react";
import Button from "../../../components/Ui/Button/Button";
import cssClasses from "./ContactData.css";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import axios from "../../../axios-order";
import Input from "../../../components/Ui/Form/Input/Input";
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
        value: "",
        validation: {},
        valid: true,
      },
    },
    loading: false,
    fromIsValid: false,
  };

  checkValidity(value, ruls) {
    let isValue = true;
    if (!ruls) {
      return true;
    }
    if (ruls.required) {
      isValue = value.trim() !== "" && isValue;
    }
    if (ruls.minLength) {
      isValue = value.length >= ruls.minLength && isValue;
    }
    if (ruls.maxLength) {
      isValue = value.length <= ruls.maxLength && isValue;
    }
    return isValue;
  }

  inputChangedHandler = (e, inputidentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOrderFormKey = { ...updatedOrderForm[inputidentifier] };
    updatedOrderFormKey.value = e.target.value;
    updatedOrderFormKey.valid = this.checkValidity(
      updatedOrderFormKey.value,
      updatedOrderFormKey.validation
    );
    updatedOrderFormKey.tuched = true;
    updatedOrderForm[inputidentifier] = updatedOrderFormKey;

    let formIsValid = true;

    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, fromIsValid: formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formDataIdentifier in this.state.orderForm) {
      formData[formDataIdentifier] = this.state.orderForm[
        formDataIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData,
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
    let formElementArray = [];

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

export default ContactData;
