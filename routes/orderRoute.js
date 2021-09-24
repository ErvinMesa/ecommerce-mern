const {v4:uuidv4} = require('uuid');
const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51JbfMhD2Z68d6DBXPGJbWkcqNBVV5QZHWvXseqwKL2EFBVkiiVeQdpMu5zxbhTWwhnQA5BYRZEIZVAxXJYWSWZFf00wPp2LPH7");
const Order = require('../models/orderModel')

router.post("/placeorder", async (req,res) => {

    const {token,cartItems,currentUser,subtotal} = req.body
    const line_items = Array()
    cartItems.forEach(item => {
        line_items.push({
            price_data:{
                currency:"php",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100,
            },
            quantity: item.quantity
        })
    });

    
    const order = new Order({
        userid: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        orderItems : cartItems,
        shippingAddress:{
            address: token.card.address_line1,
            city: token.card.address_city,
            country: token.card.address_country,
            postalCode: token.card.address_zip
        },
        orderAmount: subtotal,
        transactionId: token.id,
        isDelivered: false
    })

    order.save(err=>{
        if(!err){
            res.send('Order placed successfully')
        } else {
            return res.status(400).json({message:'Something went wrong'})
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: 'http://localhost:3000/cart',
        cancel_url: 'http://localhost:3000/cart'
    })

    // const customer = await stripe.customers.create({
    //     email: token.email,
    //     source: token._id
    // })

    // const payment = await stripe.charges.create({
    //     amount: subtotal * 100,
    //     currency: "php",
    //     customer: customer.id,
    //     receipt_email: token.email
    // } , {
    //     idempotencyKey: uuidv4()
    // })
})

router.post("/getordersbyuserid",(req,res)=>{
    const userid = req.body.userid

    Order.find({userid:userid},(err,docs)=>{
        if(err){
            return res.status(400).json({message:"Something went wrong"})
        }
        else{
            res.send(docs)
        }
    })
})

router.get("/getallorders",(req,res)=>{
    Order.find({},(err,docs)=>{
        if(err){
            return res.status(400).json({message:"Something went wrong"})
        }
        else{
            res.send(docs)
        }
    })
})

module.exports = router