const fs = require('fs'); // Importer le module File System

async function handleUsername(bot, chatId, userId, username) {
  const buttons = [
    [
      {
        text: 'Start',
        web_app: { url: 'https://cbb-tma-front-end.vercel.app' },
      },
    ],
    // [{ text: 'Go to Go! AI-RPG', url: 'https://ton.app/social/go!-app?id=1349' }],
    // [{ text: 'X(Twitter)', url: 'https://x.com/gorwachain' }],
    // [{ text: 'Telegram', url: 'https://t.me/gorwachain' }],
    // [{ text: 'Discord', url: 'https://discord.com/gorwachain' }],
    // [{ text: 'Website', url: 'https://www.goplatform.io/' }],
  ];
  const rocketEmoji = '\u2708\uFE0F'; // ✈️
  const earthEmoji = '\uD83C\uDF0D'; // 🌍
  const cameraEmoji = '\uD83D\uDCF7'; // 📷
  const mobileEmoji = '\uD83D\uDCF1'; // 📲
  const trophyEmoji = '\uD83C\uDFC6'; // 🏆

  const welcomeText = `Welcome to the Nomad Mini App, ${username}!\n
  What can this bot do?\n
  ${earthEmoji} Click Start below\n
  ${cameraEmoji} Answer daily questions to earn rewards and help us improve our travel app\n
  ${mobileEmoji} Invite friends and complete social tasks for extra rewards\n
  ${trophyEmoji} Compete on the leaderboard and win a share of our $20,000 airdrop\n
  Nomad is your gateway to freedom and adventure! ${rocketEmoji}`;

  // Envoyer d'abord l'image de bienvenue
  const localImagePath = 'https://res.cloudinary.com/dq6c6ttrz/image/upload/v1720511232/nomad-miniapp-image_af4n4g.jpg'; // Remplacez par le chemin de votre image
  // const imageData = fs.readFileSync(localImagePath);
  const originalFilename = localImagePath.split('/').pop();

  await bot.sendPhoto(
    chatId,
    localImagePath,
    {
      caption: welcomeText,
      filename: originalFilename,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: buttons,
      },
    }
  );

  // Ensuite, envoyer le texte de bienvenue avec les boutons
  // await bot.sendMessage(chatId, welcomeText, {
  //   parse_mode: 'HTML',
  //   reply_markup: {
  //     inline_keyboard: buttons,
  //   }
  // });
}

module.exports = {
  handleUsername,
};
