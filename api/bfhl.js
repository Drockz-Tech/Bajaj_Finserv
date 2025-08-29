
const FULL_NAME = "john_doe"; 
const DOB = "17091999"; 
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse();
  return reversed
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, error: "Method Not Allowed" });
  }

  try {
    const data = req.body.data || [];

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    let concatString = alternatingCapsReverse(
      alphabets.map((a) => a.toLowerCase()).join("")
    );

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
}
