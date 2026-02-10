import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());

const EMAIL = process.env.OFFICIAL_EMAIL;

const fibonacci = (n) => {
  const arr = [0, 1];
  for (let i = 2; i < n; i++) arr.push(arr[i - 1] + arr[i - 2]);
  return arr.slice(0, n);
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const hcf = (arr) => arr.reduce((a, b) => gcd(a, b));
const lcm = (arr) => arr.reduce((a, b) => (a * b) / gcd(a, b));

app.get("/health", (req, res) => {
  res.json({ is_success: true, official_email: EMAIL });
});

app.post("/bfhl", async (req, res) => {
  try {
    const key = Object.keys(req.body)[0];
    let data;

    if (key === "fibonacci") data = fibonacci(req.body[key]);
    else if (key === "prime") data = req.body[key].filter(isPrime);
    else if (key === "lcm") data = lcm(req.body[key]);
    else if (key === "hcf") data = hcf(req.body[key]);
    else if (key === "AI") {
      const r = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: req.body[key] }] }] }
      );
      data = r.data.candidates[0].content.parts[0].text.split(" ")[0];
    } else throw new Error("Invalid key");

    res.json({ is_success: true, official_email: EMAIL, data });
  } catch (e) {
    res.status(400).json({ is_success: false, official_email: EMAIL });
  }
});

app.listen(process.env.PORT || 3000);
