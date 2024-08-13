import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_MEALS = [
  {
    id: "1",
    title: "Супер-Товар-1",
    price: 7,
    description:
      "Благодаря своему высокому качеству, этот Супер-Товар-1 прослужит вам очень долго.",
  },
  {
    id: "2",
    title: "Супер-Товар-2",
    price: 8,
    description:
      "Благодаря своему высокому качеству, этот Супер-Товар-2 прослужит вам очень долго.",
  },
  {
    id: "3",
    title: "Супер-Товар-3",
    price: 9,
    description:
      "Благодаря своему высокому качеству, этот Супер-Товар-3 прослужит вам очень долго.",
  },
  {
    id: "4",
    title: "Супер-Товар-4",
    price: 10,
    description:
      "Благодаря своему высокому качеству, этот Супер-Товар-4 прослужит вам очень долго.",
  },
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {DUMMY_MEALS.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            description={product.description}
            id={product.id}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
