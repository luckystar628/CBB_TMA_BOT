const TelegramBot = require('node-telegram-bot-api');
const { TOKEN, BACKEND_URL } = require('./config.js');
const { handleUsername } = require('./game.js');

const axios = require('axios');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async msg => {
  try {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username;

    const { text } = msg;
    const COMMANDS = text.toUpperCase();

    if (!text) return;

    handleUsername(bot, chatId, userId, username);
  } catch (err) {
    console.error(err);
  }
});

bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const userId = msg.from.id;
  const first_name = msg.from.first_name || 'Anonymous';
  const last_name = msg.from.last_name || '';
  const referralCode = match[1]; // Extracted from the start parameter
  axios
    .post(`${BACKEND_URL}/api/v1/users/addReferral`, {
      user: referralCode,
      friend_id: userId,
      friend_username: username,
    })
    .then(res => {
      console.log('--//---OK!!!----//---', res);
      console.log('--//---referrerUsername----//---', referralCode);
      console.log('--//---USER_NAME----//---', username, userId);
    })
    .catch(error => {
      console.error(error);
    });
});
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const userId = msg.from.id;
  const referralCode = match[1]; // Extracted from the start parameter
  console.log('--//---USER_NAME----//---', username, userId, referralCode);
  axios
    .post(`${BACKEND_URL}/friend/addreferral`, {
      username: username,
      userId: userId,
    })
    .then(res => {
      console.log('--//---OK!!!----//---', res);
      console.log('--//---referrerUsername----//---', referralCode);
      console.log('--//---USER_NAME----//---', username, userId);
    })
    .catch(error => {
      console.error(error);
    });
});
