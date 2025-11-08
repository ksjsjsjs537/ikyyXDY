const quotes = [
  "Semangat terus, jangan nyerah!",
  "Waktu terbaik untuk memulai adalah sekarang.",
  "Hidup itu bukan tentang menunggu badai berlalu, tapi belajar menari di tengah hujan.",
];

export default function handler(req, res) {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json({
    status: true,
    quote: random,
  });
}
