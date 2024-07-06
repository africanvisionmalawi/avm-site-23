import styles from "./buyButton.module.css";

export const BuyButton = ({
  productId,
  name,
  price,
  description,
  image,
  url,
  weight,
  length,
  width,
  height,
}) => {
  return (
    <button
      className={`${styles.button} snipcart-add-item`}
      data-item-id={productId}
      data-item-name={name}
      data-item-price={price}
      data-item-description={description}
      data-item-image={image}
      data-item-url={url}
      data-item-length={length}
      data-item-weight={weight}
      data-item-width={width}
      data-item-height={height}
    >
      Add to basket
    </button>
  );
};
