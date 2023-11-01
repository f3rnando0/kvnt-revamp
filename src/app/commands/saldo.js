import { UserService } from '../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const user = await userService.find();
    const args = ctx.update.message.text.split(' ');
    
    if (!user) return;

    if (user.admin === true) {
      if (!args[1] || !args[2] || !args[3])
        return await ctx.reply(
          `Use /saldo \\[user\\-id\\] \\[brl\\/usd\\] \\[quantidade\\]`,
          {
            parse_mode: 'MarkdownV2',
          }
        );

      if (!args[2] === 'brl' || !args[2] === 'usd')
        return await ctx.reply(
          `Use /saldo \\[user\\-id\\] \\[brl\\/usd\\] \\[quantidade\\]`,
          {
            parse_mode: 'MarkdownV2',
          }
        );

      const add = await userService.addBalanceById(
        args[1],
        parseInt(args[3]),
        args[2],
      );

      if (!add) return ctx.reply(`Houve um erro durante a adição de saldo.`);

      return await ctx.reply(
        `*${parseInt(
          args[3]
        )}* *${args[2].toUpperCase()}* foi adicionado para o ID: \`${
          args[1]
        }\`\\.`,
        {
          parse_mode: 'MarkdownV2',
        }
      );
    }
  },
};
