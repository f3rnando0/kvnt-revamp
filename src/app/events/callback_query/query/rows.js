import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');

    const userService = new UserService(ctx.from.id);
    const user = await userService.find();
    if (!user)
      return await ctx.reply(
        `Não foi possível localizar o seu usuário no banco de dados`
      );

    if (user.lastState.match('rows')) {
        await ctx.reply(`Digite a quantidade de linhas a ser exportadas:`)
        return await ctx.answerCbQuery()
    }
  },
};
