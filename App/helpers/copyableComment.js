export const copyableComment = orders => {
    let tempOrders = [...orders];
    let filteredArray = [];
    tempOrders.forEach(order => {
      for (let i = 1; i < tempOrders.length; i++) {
        if (
          order.ketchup === tempOrders[i].ketchup &&
          order.mayonnaise === tempOrders[i].mayonnaise &&
          order.onion === tempOrders[i].onion &&
          order.wet === tempOrders[i].wet &&
          order.spicy === tempOrders[i].spicy
        ) {
          if (order.quantity) {
            order.quantity++;
            tempOrders.splice(i);
          } else {
            order.quantity = 2;
            tempOrders.splice(i);
          }
        }
      }
      if (!order.quantity) {
        order.quantity = 1;
      }
      filteredArray.push(order);
    });
   console.log(filteredArray)
  };
  