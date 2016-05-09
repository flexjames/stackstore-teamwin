var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path')

var templateDir = path.join(__dirname, 'templates', 'confirmation');

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MG_USER,
    pass: process.env.MG_PASS
  }
});

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

module.exports.sendOrderConfirmation = transporter.templateSender(new EmailTemplate(templateDir), { from: 'testing@fsa.com' });