import ProductListItem from "./ProductListItem";

const AllProducts = ({ products }) => {
  return products.map((product, index) => {
    return <ProductListItem product={product} key={index} />;
  });
};

export default AllProducts;
