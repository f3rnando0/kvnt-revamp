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

const statesFiles = fs
  .readdirSync(path.join(__dirname + '../../states'))
  .filter((file) => file.endsWith('.js'));

export default {
  async execute(context) {
    const ctx = context[0];

    if (!ctx.from.is_bot) {
      const userService = new UserService(ctx.from.id);

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
                if (command === inputCommand) {
                  const imported = await import(
                    `../../commands/${files[index]}`
                  );

                  imported.default.execute(ctx);
                }
              });
            }
          } else {
            if (user.lastState === 'none') {
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
