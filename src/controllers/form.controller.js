const nodemailer = require('nodemailer');
const validation = require('./validation'); 

//test end point
exports.apiTest = (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 20%;">
      <p style="font-size: 1.5rem;">You just hit the dopest API on the block </p>
    </div>
  `);
};

//contact-us form submission 
exports.contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const validation_message = await validation.postSubmission(req.body);
        if (validation_message.error) {
            return res.status(400).json({
                message: "Validation failed",
                error: validation_message.error.details[0]?.message.replace(/"/g, '')
            });
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',  
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS 
            }
        });

        const mailOptions = {
            from: email, 
            to: process.env.CONTACT_RECEIVER_EMAIL,  
            subject: 'ALERT ON YOUR PORTFOLIO WEB PAGE',
            text: `**Contact Us Message Submission**
              Message from: ${name}
              Email ID: ${email}
              Message:
              ${message}
            `,
            html: `
              <h2> Contact Us Message Submission</h2>
              <p><strong>Message from:</strong> ${name}</p>
              <p><strong>Email ID:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px; color: #333;">
                  ${message.replace(/\n/g, "<br>")}
              </blockquote>
            `
            };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Message has been sent successfully." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to process your request" });
    }
};
