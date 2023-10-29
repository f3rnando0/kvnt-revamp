import fs from 'fs';
import database from './database/index.js';
import { error, ok } from './utils/logger.js';
import { Telegraf } from 'telegraf';
import { token } from './config/bot.js';
import { config } from './config/app.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

process.on('uncaughtException', function (e) {
  error(`${e.name} - ${e.message}`);
});

try {
  await database();

  const bot = new Telegraf(token);

  bot.catch((err) => {
    error(err.message);
  });

  bot.launch();

  const events = fs.readdirSync(path.join(__dirname + '/app/events'));

  config.listeningEvents.forEach((event) => {
    events.map((fileName) => {
      if (fileName === event) {
        ok(`EVENT: ${event} - loaded.`);
        bot.on(event, async (...args) => {
          const imported = await import(`./app/events/${fileName}/index.js`);

          imported.default.execute(args);
        });
      }
    });
  });

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
} catch (e) {
  error(e.message);
}
