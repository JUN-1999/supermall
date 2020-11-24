
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1. payload 新添加的商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      // 2. 判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit("addCounter", oldProduct);
        resolve("当前的商品数量+1");
      } else {
        // 添加新的商品
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit("addToCart", payload);
        resolve("添加了 新的商品");
      }
    });
  }
};