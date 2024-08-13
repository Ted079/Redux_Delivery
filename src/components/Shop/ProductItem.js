import { cartAction } from "../../store/cart-slice";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addItemHandler = () => {
    // const updatedItemsQuantity = cart.totalQuantity + 1;

    // const updatedItems = cart.items.slice();
    // const existingItem = updatedItems.find((item) => item.id === id);

    // if (existingItem) {
    //   const updatedExistingItem = { ...existingItem };
    //   updatedExistingItem.quantity++;
    //   updatedExistingItem.totalPrice = updatedExistingItem.totalPrice + price;

    //   const existingItemIndex = updatedItems.findIndex(
    //     (item) => item.id === id
    //   );
    //   updatedItems[existingItemIndex] = updatedExistingItem;
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     totalPrice: price,
    //     quantity: 1,
    //     title: title,
    //   });
    // }

    // const updatedCart = {
    //   items: updatedItems,
    //   totalQuantity: updatedItemsQuantity,
    // };

    // dispatch(cartAction.updatedCart(updatedCart));

    dispatch(cartAction.addItem({
      id: id,
      title: title,
      price: price,
    }));
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
