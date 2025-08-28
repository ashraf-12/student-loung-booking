const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",   // replace with your Gmail
    pass: "your-app-password"      // Gmail App Password (not your normal password)
  }
});

// API route
app.post("/book", async (req, res) => {
  const { name, matric, phone, from, to } = req.body;

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: ["s231020049-5@studentmail.unimap.edu.my"], // Student email
    subject: "New Student Lounge Booking",
    text: `
New Booking Details:
------------------------
Name: ${name}
Matric Number: ${matric}
Phone: ${phone}
From: ${from}
To: ${to}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Booking submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send booking. Try again later." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
document.getElementById("bookingForm").addEventListener("submit", function() {
  alert("✅ Your booking has been submitted!");
});

