const keyboard = [[{ text: "Send my location", request_location: true }]];

const commands = {
  "/start": {
    text: "Welcome! Press the button and I'll tell you the current weather near you.",
    options: {
      keyboard: keyboard,
    },
  },
  "/help": {
    text: "Press the button and I'll tell you the current weather near you.",
    options: {
      keyboard: keyboard,
    },
  },
};
module.exports = commands;
