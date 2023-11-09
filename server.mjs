import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(cors());
app.use(express.static("public"));

app.use(cors({ origin: 'https://darkoilieski.netlify.app' }));

// Replace bodyParser with express's built-in methods
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`request received: ${name}, ${email}, ${message}`);
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `From: ${email}\nMessage: ${message}`,
};


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
      return res.status(500).send("Internal Server Error");
    }
    console.log("Email sent:", info.response);
    res.json({ status: 'success' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
