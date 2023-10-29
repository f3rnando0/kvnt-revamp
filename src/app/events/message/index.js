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
            config.inputCommands.some((commandArray, index) => {
              if(commandArray.includes(ctx.update.message.text)) {
                console.log(commandArray, index)
              }
            })
          }
        }
      } else {
        const noUserUseCase = await import(`../../useCases/noUserUseCase.js`);
        noUserUseCase.default.execute(ctx);
      }
    }
  },
};
