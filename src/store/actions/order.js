import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInIt = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrder = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
      });
  };
};
