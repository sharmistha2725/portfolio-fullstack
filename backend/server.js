const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS (IMPORTANT)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB ERROR:", err));

// ✅ Schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ FIXED ROUTE HERE 👇
app.post("https://portfolio-backend-kt0w.onrender.com/contact", async (req, res) => {
  console.log("📩 Received:", req.body);

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    // ✅ Save to MongoDB
    const data = new Contact({ name, email, subject, message });
    await data.save();
    console.log("📦 Saved to DB");

    // ✅ Email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    console.log("📬 Email sent to you");

    // ✅ Auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting me!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out! I received your message.</p>
        <p>I’ll get back to you soon.</p>
      `
    });

    console.log("📨 Auto-reply sent");

    res.json({ message: "Message sent successfully ✅" });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: "Error sending message" });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));