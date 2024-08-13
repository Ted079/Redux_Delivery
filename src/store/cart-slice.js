import { createSlice } from "@reduxjs/toolkit";
import { mainAction } from "./main-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions) {
      const newItem = actions.payload; // {} полезрное действие;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.isCartContentChanged = true;
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, actions) {
      const id = actions.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.isCartContentChanged = true;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice -= existingItem.price;
      }
    },

    updatedCart(state, actions) {
      state.items = actions.payload.items;
      state.totalQuantity = actions.payload.totalQuantity;
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      mainAction.showStatusMessage({
        status: "pending",
        title: "Отправка Данных",
        message: "Данные корзины отправляются на сервер..",
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://http-learn-11453-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных!");
      }
    };

    try {
      await sendDataHttpRequest();
      dispatch(
        mainAction.showStatusMessage({
          status: "success",
          title: "Данные Отправлены Успешно",
          message: "Данные корзины отправлены на сервер!",
        })
      );
    } catch (error) {
      dispatch(
        mainAction.showStatusMessage({
          status: "error",
          title: "Ошибка Запроса",
          message: "Ошибка при отправке данных на сервер!",
        })
      );
    }
  };
};

export const cartAction = cartSlice.actions;

export const getCartData = () => {
  return async (dispatch) => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        "https://http-learn-11453-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Не возможно извлечь данные");
      }

      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = await getDataHttpRequest();
      dispatch(
        cartAction.updatedCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        mainAction.showStatusMessage({
          status: "error",
          title: "Ошибка Запроса",
          message: "Ошибка при получении данных на сервер!",
        })
      );
    }
  };
};

export default cartSlice.reducer;
