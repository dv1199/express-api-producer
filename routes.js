const express = require('express');
const { Kafka } = require("kafkajs");
const router = express.Router();
const { getCurrentISTTime } = require('./utils')
const crypto = require('crypto')

const kafka = new Kafka({
    clientId: "myapp",
    brokers: ["127.0.0.1:9092"],
});

const ORDER_ORIGINS = {
    Swiggy: 'Swiggy',
    Zomato: 'Zomato',
    UberEats: 'Uber Eats'
}

function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

/* Endpoint to post a swiggy order */
router.post('/swiggy', async (req, res, next) => {
    try {
        // attach random ID and current time to order data for tracking
        const orderData = req.body;
        orderData['order_time'] = getCurrentISTTime();
        orderData['order_id'] = crypto.randomUUID();
        orderData['order_origin'] = ORDER_ORIGINS.Swiggy;

        // publish this order to kafka
        console.log(`Received new order from ${orderData.order_origin}: ${orderData.outlet_name}`)

        // simulate artificial time delay
        console.log("Waiting...");
        await delay(Math.random() * 6000);
        console.log("Wait over");

        const producer = kafka.producer();
        await producer.connect();
        console.log("Producer connected!");
        await producer.send({
            topic: "Orders", // Orders topic holds order for all food items
            messages: [
              {
                value: JSON.stringify(orderData),
              },
            ],
        });
        console.log("Produced order successfully!");
        await producer.disconnect();

        // return success HTTP response
        res.status(201).json(orderData);
    } 
    catch (error) {
        next(error);
    }
});

/* Endpoint to post a zomato order */
router.post('/zomato', async (req, res, next) => {
    try {
        // attach random ID and current time to order data for tracking
        const orderData = req.body;
        orderData['order_time'] = getCurrentISTTime();
        orderData['order_id'] = crypto.randomUUID();
        orderData['order_origin'] = ORDER_ORIGINS.Zomato;

        // publish this order to kafka
        console.log(`Received new order from ${orderData.order_origin}: ${orderData.outlet_name}`)
      
        console.log("Waiting...")
        // simulate artificial time delay
        await delay(Math.random() * 7000);
        console.log("Wait over")

        const producer = kafka.producer();
        await producer.connect();
        console.log("Producer connected!");
        const result = await producer.send({
            topic: "Orders", // Orders topic holds order for all food items
            messages: [
              {
                value: JSON.stringify(orderData),
              },
            ],
        });
        console.log("Produced order successfully!");
        await producer.disconnect();

        // return success HTTP response
        res.status(201).json(orderData);
    } 
    catch (error) {
        next(error);
    }
});

/* Endpoint to post a uber-eats order */
router.post('/uber-eats', async (req, res, next) => {
    try {
        // attach random ID and current time to order data for tracking
        const orderData = req.body;
        orderData['order_time'] = getCurrentISTTime();
        orderData['order_id'] = crypto.randomUUID();
        orderData['order_origin'] = ORDER_ORIGINS.UberEats;

        // publish this order to kafka
        console.log(`Received new order from ${orderData.order_origin}: ${orderData.outlet_name}`)
      
        // simulate artificial time delay
        await delay(Math.random() * 4000);

        const producer = kafka.producer();
        await producer.connect();
        console.log("Producer connected!");
        const result = await producer.send({
            topic: "Orders", // Orders topic holds order for all food items
            messages: [
              {
                value: JSON.stringify(orderData),
              },
            ],
        });
        console.log("Produced order successfully!");
        await producer.disconnect();

        // return success HTTP response
        res.status(201).json(orderData);
    } 
    catch (error) {
        next(error);
    }
});
module.exports = router;