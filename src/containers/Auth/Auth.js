import React, { Component } from "react";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Form/Input/Input";
import cssClasses from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Ui/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../sheard/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elemetType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        tuched: false,
      },
      password: {
        elemetType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        tuched: false,
      },
    },
    formIsValid: false,
    isSignUp: false,
  };
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControlsForm = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        tuched: true,
      }),
    });

    let formIsValid = true;
    for (let key in updatedControlsForm) {
      formIsValid = updatedControlsForm[key].valid && formIsValid;
    }

    this.setState({ controls: updatedControlsForm, fromIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState((preState) => {
      return {
        isSignUp: !preState.isSignUp,
      };
    });
  };

  render() {
    const formElementArray = [];

    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = "";
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let redirectHome = null;
    if (this.props.isAuthenticated) {
      redirectHome = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={cssClasses.Auth}>
        {redirectHome}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}

          <Button btnType="Success" disabled={!this.state.fromIsValid}>
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch To {this.state.isSignUp ? "SignIn" : "SinUp"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
