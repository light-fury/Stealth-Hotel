const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// res.set('Cache-Control', 'public, max-age=43200, s-maxage=86400');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: 'mattbelljs@gmail.com',
    pass: 'test',
  },
});

exports.sendEmailCF = functions.https.onRequest((req, res) => {
  const mailOptions = {
    from: `contactform@domain.com`,
    to: `mattbelljs@gmail.com`
  };

  // in case you get CORS errors you need these 2 lines of code
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');

  cors(req, res, () => {
    mailOptions.subject = 'Contact Form Message';
    mailOptions.html =   `
    <p>Email: ${req.body.email}</p>
    <p>Name: ${req.body.name}</p>
    <p>Message: ${req.body.message}</p>
    `;
      return mailTransport.sendMail(mailOptions)
        .then(() => {
        return res.status(200).json({success: true})
      })
        .catch((e) => {
          return res.status(400).json({err: e});
        })
  });
});