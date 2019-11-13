export const generateOrderText = order => {
  let txt = '';
  txt += !order.ketchup ? 'კეტჩუპის გარეშე, ' : '';
  txt += !order.mayonnaise ? 'მაიონეზის გარეშე, ' : '';
  txt += order.onion ? 'ხახვით, ' : 'უხახვო, ';
  txt += order.wet ? 'სველი, ' : '';
  txt += order.spicy ? 'ცხარე.' : 'არაცხარე.';
  return txt;
};

export const generateComment = (orders) => {
  const tempOrders = [...orders];
  const ordersDetails = {};
  tempOrders.forEach(order => {
    const text = generateOrderText(order);
    if (ordersDetails[text]) {
      ordersDetails[text].quantity++;
    } else {
      ordersDetails[text] = {
        quantity: 1
      }
    }
  })

  let orderTxt = '';
  for (const text in ordersDetails) {
    const element = ordersDetails[text];
    orderTxt += `${element.quantity} ${text} `;
  }
  return orderTxt.slice(0, orderTxt.length - 1);
}
