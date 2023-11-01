import { UserService } from '../../services/userService.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from '../../../config/app.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = fs
  .readdirSync(path.join(__dirname + '../../../commands'))
  .filter((file) => file.endsWith('.js'));
const commands = files.map((file) => file.replace('.js', ''));

export default {
  async execute(context) {
    const ctx = context[0];

    if (!ctx.from.is_bot) {
      const userService = new UserService(ctx.from.id);
      await userService.handleResetDailyRows();

      const user = await userService.find();
      if (user) {
        if (!user.blacklisted) {
          if (!user.termsAccepted) {
            const termsNotAccepted = await import(
              `../../useCases/termsNotAcceptedUseCase.js`
            );
            termsNotAccepted.default.execute(ctx);
          }
          if (ctx.message.entities) {
            if (ctx.message.entities[0].type === 'bot_command') {
              commands.map(async (command, index) => {
                const inputCommand = ctx.update.message.text.replace('/', '');
                if (inputCommand.match(command)) {
                  const imported = await import(
                    `../../commands/${files[index]}`
                  );

                  imported.default.execute(ctx);
                }
              });
            } else if (ctx.message.entities[0].type === 'url') {
              if (user.lastState.match('search')) {
                const imported = await import(`../states/search_state.js`);
                imported.default.execute(ctx, user);
              }
            }
          } else {
            if (user.lastState === 'none') {
              if (ctx.update.message.text === '⭐ Entre no nosso canal!') {
                return await ctx.reply(`https://t.me/kvntsearch`);
              }

              if (ctx.update.message.text === '⭐️ Join our channel!') {
                return await ctx.reply(`https://t.me/kvntsearch`);
              }

              config.inputCommands.map(async (commandArray) => {
                if (commandArray.includes(ctx.update.message.text)) {
                  const index = commandArray.indexOf(ctx.update.message.text);
                  const imported = await import(
                    `../../commands/inputCommands/index.js`
                  );

                  imported.default.execute(commandArray, index, ctx, user);
                }
              });
            } else {
              if (user.lastState.match('rows')) {
                const imported = await import(`../states/search_rows_state.js`);
                imported.default.execute(ctx, user);
              } else {
                const imported = await import(`../states/search_state.js`);
                imported.default.execute(ctx, user);
              }
            }
          }
        }
      } else {
        const noUserUseCase = await import(`../../useCases/noUserUseCase.js`);
        noUserUseCase.default.execute(ctx);
      }
    }
  },
};
