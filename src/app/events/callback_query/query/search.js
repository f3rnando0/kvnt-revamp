import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');
    console.log(args)

    const userService = new UserService(ctx.from.id);
    const user = await userService.find();

    if (!user)
      return await ctx.reply(
        `Não foi possível localizar o seu usuário no banco de dados.`
      );

    if (!user.subscription.subscribed)
      return await ctx.reply(
        `Você não possui um plano ativo. Compre um agora!`
      );

    const state = await userService.changeState(`search_${args[2]}_${args[0]}_state`);
    if (!state)
      return await ctx.reply(
        `Não foi possível localizar o seu usuário no banco de dados.`
      );

    await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );

    if(args[2] === 'domain') {
        await ctx.replyWithHTML(`Digite o domínio para consulta (sem https/www):`, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '❌ Cancelar',
                    callback_data: `search_${args[2]}_${args[0]}_cancel`,
                  },
                ],
              ],
            },
          });
    } else {
        await ctx.replyWithHTML(`Digite ${args[2] === 'username' ? 'o USERNAME' : args[2] === 'password' ? 'a PASSWORD' : ''} para consulta:`, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '❌ Cancelar',
                    callback_data: `search_${args[2]}_${args[0]}_cancel`,
                  },
                ],
              ],
            },
          });
    }

    
    return await ctx.answerCbQuery();
  },
};
