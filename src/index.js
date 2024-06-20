const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('./config.js');
const { handleUsername } = require('./game.js');
const http = require('http');

const bot = new TelegramBot(TOKEN, { polling: true });

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

bot.on('message', async msg => {
  try {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || 'Unknown user';
    const { text } = msg;
    const COMMANDS = text.toUpperCase();
    
    if (!text) return;

    switch (COMMANDS) {
      // case '/START':
      //   bot.sendMessage(
      //     chatId,
      //     `Let's get started!\n\nWhat is your XATOMS username?`,
      //     {
      //       parse_mode: 'HTML',
      //     }
      //   );
      //   break;
      case '/START':
        handleUsername(bot, chatId, userId, username);
        break;
      default:
        bot.sendMessage(chatId, `Unknown command: ${text}`);
        break;
        // handleUsername(bot, chatId, userId, text);
    }
  } catch (err) {
    console.error(err);
  }
})
