const sgMail = require('@sendgrid/mail');

module.exports = {
    send: function(props){
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const msg = {
  to: 'kjsudi@gmail.com',
  from: 'alerts@krankj.in', // Use the email address or domain you verified above
  subject: 'New message submitted',
  html: `
  <html>
  <head>
  <style>
   div {
     background-color: 	#F0F0F0;
     width: 100%;
     padding: 10px;
     font-family: Arial, Helvetica, sans-serif;
   }
   </style>
   </head>
   <body>
  <div>
  <p><strong>Name:</strong> ${props.name}</p>
  <p><strong>Email:</strong> ${props.email}</p>
  <p><strong>Message:</strong> ${props.message}</p>
  </div>
  </body>
  </html>
  `,
};
//ES8
(async () => {
  try {
    await sgMail.send(msg);
    console.log(`Email with message: ${props.message} sent successfully`)
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
    }
}

