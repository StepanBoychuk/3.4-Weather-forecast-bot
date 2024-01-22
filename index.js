require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const logger = require("./src/logger");
const weatherForecastHandler = require("./src/weatherForecastHandler");
const commands = require("./src/commands");

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on("polling_error", logger.error);

bot.on("text", (msg) => {
  if (commands[msg.text]) {
    bot.sendMessage(msg.chat.id, commands[msg.text].text);
    return;
  }
  bot.sendMessage(msg.chat.id, "Unexpected command. Try /help.");
});

bot.on("location", async (msg) => {
  bot.sendMessage(msg.chat.id, await weatherForecastHandler(msg.location));
});
