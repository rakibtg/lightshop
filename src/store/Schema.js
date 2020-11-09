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

export const ProductViewSelections = () => {
  return {
    color: undefined,
    storage: undefined,
    power: undefined,
    quantity: undefined,
  };
};

const Schema = {
  title: "Light Shop",
  products: [],
  cart: {
    items: [],
    count: 0,
    subTotal: 0.0,
  },
  productView: {
    product: null,
    selections: ProductViewSelections(),
    selectedOption: null,
  },
};

export default Schema;
