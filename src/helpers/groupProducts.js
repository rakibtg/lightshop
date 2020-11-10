const groupProducts = (cartItems, products) => {
  const _group = {};
  cartItems.forEach((item, index) => {
    item = { ...item, cartItemIndex: index };
    const product = products.find((p) => p.id === item.productId);
    const { quantity: maxQuantity } = product.options.find(
      (op) => op.color === item.color
    );
    item = { ...item, maxQuantity };
    if (_group.hasOwnProperty(item.productId)) {
      _group[item.productId] = {
        ..._group[item.productId],
        cart: [..._group[item.productId]["cart"], item],
      };
    } else {
      // Add the product to the group.
      _group[item.productId] = {
        ...product,
        cart: [item],
      };
    }
  });
  return Object.values(_group);
};

export default groupProducts;
