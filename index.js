const express = require('express');
const mineflayer = require('mineflayer');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

let bot;

app.post('/start-bot', (req, res) => {
  const { ip, port, version } = req.body;

  if (bot) {
    bot.quit();
  }

  bot = mineflayer.createBot({
    host: ip,
    port: parseInt(port),
    version: version,
    username: 'AFKBot' + Math.floor(Math.random() * 1000)
  });

  bot.on('spawn', () => {
    res.send('✅ تم تشغيل البوت ودخوله السيرفر!');

    // حركة خفيفة كل 5 ثواني (جركحة)
    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() - 0.5) * 2;
      const y = bot.entity.position.y;
      const z = bot.entity.position.z + (Math.random() - 0.5) * 2;
      bot.lookAt({ x, y, z }, true);
    }, 5000);
  });

  bot.on('error', (err) => {
    console.log(err);
    res.send('❌ خطأ: ' + err.message);
  });

  bot.on('end', () => {
    console.log("تم فصل البوت من السيرفر.");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("السيرفر شغال على بورت " + PORT);
});
