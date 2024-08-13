import styles from "./CartButton.module.css";
import { mainAction } from "../../store/main-slice";
import { useSelector , useDispatch } from "react-redux";


const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const openCartHandler = () => {
    dispatch(mainAction.setCartVisibility());
  };

  return (
    <button className={styles.button} onClick={openCartHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;