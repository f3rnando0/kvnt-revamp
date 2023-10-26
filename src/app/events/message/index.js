import { UserService } from '../../services/userService.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  async execute(ctx) {
    console.log(ctx[0])
    const files = fs
      .readdirSync(path.join(__dirname + '../../../commands'))
      .filter((file) => file.endsWith('.js'));
    const commands = files.map((file) => file.replace('.js', ''));
    if (!ctx.from.is_bot) {
      const userService = new UserService(ctx.from.id);

      const user = await userService.find();
      if (user) {
        if (!user.blacklisted) {
          if (ctx.message.entities[0].type === 'bot_command') {
            commands.map(async (command, index) => {
              const inputCommand = ctx.update.message.text.replace('/', '');
              if (command === inputCommand) {
                const imported = await import(`../../commands/${files[index]}`);

                imported.default.execute(ctx);
              }
            });
          }
        }
      } else {
        const noUserUseCase = await import(`../../useCases/noUserUseCase.js`);
        noUserUseCase.default.execute(ctx);
      }
    }
  },
};
