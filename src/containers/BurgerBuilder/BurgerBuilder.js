import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((inkey) => {
        return ingredients[inkey];
      })
      .reduce((prevValue, currentValue) => {
        return prevValue + currentValue;
      }, 0);

    return sum > 0;
  };

  purchasingHandeler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseChancelHandeler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandeler = () => {
    this.props.onPurchaseInIt();
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.onInItIngredient();
  }

  render() {
    // disable ingredients buttons
    const disableInfo = { ...this.props.ings };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Ingredient Can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            disable={disableInfo}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            price={this.props.ttp}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasingHandeler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.ttp}
          modalClosed={this.purchaseChancelHandeler}
          continued={this.purchaseContinueHandeler}
          ingredients={this.props.ings}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closed={this.purchaseChancelHandeler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    ttp: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredients(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actions.removeIngredients(ingName)),
    onInItIngredient: () => dispatch(actions.inItIngredients()),
    onPurchaseInIt: () => dispatch(actions.purchaseInIt()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
