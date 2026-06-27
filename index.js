import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    is_success: true
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let alphaString = "";

    data.forEach((item) => {
      const str = String(item);

      if (/^\d+$/.test(str)) {
        const num = parseInt(str);

        sum += num;

        if (num % 2 === 0) {
          even_numbers.push(str);
        } else {
          odd_numbers.push(str);
        }
      } else if (/^[A-Za-z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        alphaString += str;
      } else {
        special_characters.push(str);
      }
    });

    const reversed = alphaString.split("").reverse();

    let concat_string = "";

    reversed.forEach((ch, index) => {
      concat_string += index % 2 === 0
        ? ch.toUpperCase()
        : ch.toLowerCase();
    });

    res.status(200).json({
      is_success: true,
      user_id: "armanpreet_kaur_DDMMYYYY",
      email: "YOUR_EMAIL",
      roll_number: "YOUR_ROLL_NUMBER",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (error) {
    res.status(500).json({
      is_success: false
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
