import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./../UI/Modal";
import { mainAction } from "../../store/main-slice";

const Cart = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.items);

  const closeCartHanlder = () => {
    dispatch(mainAction.setCartVisibility());
  };

  return (
    <Modal>
      <div className={styles.cart}>
        <h2>Мои Покупки</h2>
        <ul>
          {products.map((product) => (
            <CartItem
              key={product.id}
              item={{
                id: product.id,
                title: product.title,
                quantity: product.quantity,
                total: product.totalPrice,
                price: product.price,
              }}
            />
          ))}
        </ul>
        <div className={styles.actions}>
          <button className={styles["button-alt"]} onClick={closeCartHanlder}>
            Close
          </button>
          <button className={styles.button}>To Order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
