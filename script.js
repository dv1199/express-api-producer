const axios = require('axios');

SWIGGY_ORDER_URL = 'http://localhost:8080/api/orders/swiggy/'
ZOMATO_ORDER_URL = 'http://localhost:8080/api/orders/zomato/'
UBER_EATS_ORDER_URL = 'http://localhost:8080/api/orders/uber-eats/'

function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
}

// make an API call every 20 seconds for a duration of 4 minutes
// the kitchen will process the order after every 5 minutes
async function placeOrders() {
    let orderData = {
        "outlet_name": "Chandan Sandwich Shop",
        "order_amount": Math.random() * 3000
    }
    console.log("Placing swiggy, zomato, uber-eats orders ...");
    axios.post(SWIGGY_ORDER_URL, orderData, { headers: {'Content-Type': 'application/json'} });
    console.log("Placed swiggy order");
    await delay(1000);
    axios.post(ZOMATO_ORDER_URL, orderData, { headers: {'Content-Type': 'application/json'} });
    console.log("Placed zomato order");
    await delay(2000);
    axios.post(UBER_EATS_ORDER_URL, orderData, { headers: {'Content-Type': 'application/json'} });
    console.log("Placed uber-eats order");
    console.log("Placed swiggy, zomato, uber-eats orders ...");
}

var interval = setInterval(placeOrders, 20000); // place orders every 20s
setTimeout(function( ) { clearInterval(interval); }, 240000); // clear interval after 4 mins