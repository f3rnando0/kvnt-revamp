import { UserService } from '../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const user = await userService.find();

    if (!user) return;

    if (user.admin === true) {
      if (!ctx.args[0] || !ctx.args[1] || !ctx.args[2])
        return await ctx.reply(
          `Use /saldo \\[user\\-id\\] \\[brl\\/usd\\] \\[quantidade\\]`,
          {
            parse_mode: 'MarkdownV2',
          }
        );

      if (!ctx.args[1] === 'brl' || !ctx.args[1] === 'usd')
        return await ctx.reply(
          `Use /saldo \\[user\\-id\\] \\[brl\\/usd\\] \\[quantidade\\]`,
          {
            parse_mode: 'MarkdownV2',
          }
        );

      const add = await userService.addBalanceById(
        ctx.args[0],
        ctx.args[1],
        parseInt(ctx.args[2])
      );

      if (!add) return ctx.reply(`Houve um erro durante a adição de saldo.`);

      return await ctx.reply(
        `*${parseInt(
          ctx.args[2]
        )}* *${ctx.args[1].toUpperCase()}* foi adicionado para o ID: \`${
          ctx.args[0]
        }\`\\.`,
        {
          parse_mode: 'MarkdownV2',
        }
      );
    }
  },
};
