import styled from "@emotion/styled";

const Button = styled.button`
  background: #ff9a00;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: block;
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 1.2rem;
  padding: 4px 16px;
  text-align: center;
  :hover {
    background: #fdc51f;
    color: #fff;
  }
`;

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
  // console.log("productId ", productId);
  return (
    <Button
      className="snipcart-add-item"
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
    </Button>
  );
};
