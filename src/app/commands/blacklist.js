import { UserService } from '../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const user = await userService.find();
    const args = ctx.update.message.text.split(' ');

    if (!user) return;

    if (user.admin === true) {
      if (!args[1])
        return await ctx.reply(`Use /blacklist \\[user\\-id\\]`, {
          parse_mode: 'MarkdownV2',
        });

      const user = await userService.blacklist(args[1]);

      if (user === null) return await ctx.reply(`ID do usuário inválido.`);


      if (user === false) {
        return await ctx.reply(
          `Foi removido a lista de blacklist o ID\\: \`${args[1]}\`\\.`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      } else {
        return await ctx.reply(
          `Foi adicionado a lista de blacklist o ID\\: \`${args[1]}\`\\.`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      }
    }
  },
};
