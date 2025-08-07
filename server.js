const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// لتشغيل البوت بعدين من هنا
app.use(express.json());
app.use(express.static('public'));

app.post('/start-bot', async (req, res) => {
  const { ip, port, version } = req.body;

  // شغّل البوت هنا (لو عندك كود للبوت)
  console.log(`Starting bot on ${ip}:${port} (version: ${version})`);
  res.send(`Bot started on ${ip}:${port} (version: ${version})`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
