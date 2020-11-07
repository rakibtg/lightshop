export const ProductSchema = (product) => {
  return {
    id: product.id || null,
    name: product.name || "",
    brand: product.brand || "",
    price: Number(product.price) || 0.0,
    available: product.available || false,
    weight: product.weight || 0.0,
    options: product.options || [],
  };
};

export const CartSchema = (cart) => {
  return {
    product: cart.product || null,
    quantity: Number(cart.quantity) || 0,
    price: Number(cart.price) || 0,
  };
};

const Schema = {
  title: "Light Shop",
  products: [],
  cart: [],
  productView: {
    product: null,
    selections: {
      color: null,
      storage: null,
      power: null,
      quantity: null,
    },
  },
};

export default Schema;
