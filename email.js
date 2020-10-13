const sgMail = require("@sendgrid/mail");

module.exports = {
  send: function (props, isProfane) {
    let subject = "New message submitted by user: ";
    if (isProfane) {
      subject = "Profane message submitted by user: ";
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "kjsudi@gmail.com",
      from: "alerts@krankj.in", // Use the email address or domain you verified above
      subject: subject + props.name,
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

   p{
     width: 50%;
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

    (async () => {
      try {
        await sgMail.send(msg);
        console.log(`Email with message: ${props.message} sent successfully`);
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  },
};
