import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');
    
    const userService = new UserService(ctx.from.id);
    const user = await userService.find();
    if (!user)
      return await ctx.reply(
        args[2] == 'br' ? `Não foi possível localizar o seu usuário no banco de dados.` : `Unable to find user on database.`
      );

    await ctx.reply(args[2] == 'br' ? `Digite a quantidade de linhas a ser exportadas:` : `Type the rows amount to be exported:`);
    return await ctx.answerCbQuery();
  },
};
