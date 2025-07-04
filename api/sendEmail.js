
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID);

export default async function handler(req, res) {
  console.log('📩 /api/sendEmail was called');
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const emailData = {
      to: 'marissamallinger@gmail.com',
      from: 'contact@marissathedeveloper.website', // Must be verified in SendGrid
      replyTo: email, // Reply-to address
      subject: 'Website Contact Form',
      text: `Someone contacted you from marissathedeveloper.website\n\nName: ${name}\n\nEmail: ${email}\n\nMessage:\n\n${message}`,
    };

    await sendgrid.send(emailData);
    return res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('SendGrid error:', error?.response?.body || error.message);
    return res.status(500).json({
      message: 'Email failed to send.',
      error: error?.response?.body || error.message,
    });
  }
}
