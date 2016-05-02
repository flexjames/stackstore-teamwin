var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: { user: '', pass: '' }
});

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

module.exports.sendOrderConfirmation = transporter.templateSender({
  subject: 'Your order has been placed!',
  text: 'Your order has been placed!'
}, { from: 'example@email.com' });