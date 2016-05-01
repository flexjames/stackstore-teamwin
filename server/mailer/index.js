var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: { user: '', pass: '' }
});

module.exports.sendOrderConfirmation = transporter.templateSender({
  subject: 'Your order has been placed!',
  text: 'Your order has been placed!'
}, { from: 'example@email.com' });