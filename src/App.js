import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { mainAction } from "./store/main-slice";
import StatusBarMessages from "./components/UI/StatusBarMessages";
import { sendCartData, getCartData } from "./store/cart-slice";

let isİnitialRunning = true; //чтобы она не рендилась

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    if (isİnitialRunning) {
      isİnitialRunning = false;
      return;
    }
    if (cart.isCartContentChanged) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessages
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
