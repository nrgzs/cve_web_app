import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file directory (required for ES6 modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from a custom directory
dotenv.config({ path: path.join(__dirname, '../.env') });
console.log(
  '🚀 ~ TELEGRAM_BOT_TOKEN:',
  process.env.TELEGRAM_BOT_TOKEN
);

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  console.log('Received message from chat ID:', msg.chat.id);
});
const message = '🚨 Test Alert: Bot is working correctly!';

bot
  .sendMessage(chatId, message)
  .then(() => console.log('Message sent successfully!'))
  .catch((error) => console.error('Error sending message:', error));

export async function sendAlert(cve,product) {
  const message = `🚨 New CVE Detected!\n\nID: ${cve}\nDescription: ${product}`;
  await bot.sendMessage(chatId, message);
}

