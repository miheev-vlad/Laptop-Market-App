const Order = require("../models/Order");
const ErrorResponse = require('../utils/errorResponse');
const { EMAIL_URL } = require('../../config/keys');
const sendEmail = require('../utils/sendEmail');

exports.create = async (req, res, next) => {
  const { cartItems, orderAddress, paidStatus, paidSumm } = req.body;
  if (!paidStatus) {
    return next(new ErrorResponse('Order Not Paid', 400));
  }
  const user = req.user;
  try {
    const order = await Order.create({
      cartItems, orderAddress, user, paidStatus, paidSumm
    });
    const message = `
      <h3>${user.username}, your order has been successfully created!</h3>
      <h4>Order Information:</h4>
      <p>Order #${order._id}</p>
      <p>Items of goods: ${order.cartItems.length}</p>
      <p>Total order cost: $${order.paidSumm}</p>
      <p>Delivery day: ${orderAddress.date}</p>
      <hr>
      <p><b>Thank you for the order!</b></p>
      <p><i>Your LapTop Market</i></p>
    `
    try {
      await sendEmail({
        to: user.email,
        subject: 'Order created',
        text: message
      });
    } catch (error) {
      return next(new ErrorResponse('Email could not be send', 500))
    }
    res.status(201).json({
      status: 'success',
      order,
      message: 'Email Sent'
    });
  } catch (error) {
    next(error);
  }
};