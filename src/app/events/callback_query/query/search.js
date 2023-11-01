import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');
    console.log(args)

    const userService = new UserService(ctx.from.id);
    const user = await userService.find();

    if (!user)
      return await ctx.reply(
        args[0] === 'br' ? `Não foi possível localizar o seu usuário no banco de dados.` : `Unable to find user on database.`
      );

    if (!user.subscription.subscribed) {
      await ctx.answerCbQuery()
      return await ctx.reply(
        args[0] === 'br' ? `Você não possui um plano ativo. Compre um agora!` : `You don't have an active plan. Buy it now!`
      );
    }

    const state = await userService.changeState(`search_${args[2]}_${args[0]}_state`);
    if (!state)
      return await ctx.reply(
        args[0] === 'br' ? `Não foi possível localizar o seu usuário no banco de dados.` : `Unable to find user on database.`
      );

    await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );

    if(args[2] === 'domain') {
        await ctx.replyWithHTML(args[0] === 'br' ? `Digite o domínio para consulta (sem https/www):` : `Type the domain for searching (without https/www):`, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: args[0] === 'br' ? '❌ Cancelar' : '❌ Cancel',
                    callback_data: `search_${args[2]}_${args[0]}_cancel`,
                  },
                ],
              ],
            },
          });
    } else {
        await ctx.replyWithHTML( args[0] === 'br' ? `Digite ${args[2] === 'username' ? 'o USERNAME' : args[2] === 'password' ? 'a PASSWORD' : ''} para consulta:` : `Type the ${args[2] === 'username' ? 'USERNAME' : args[2] === 'password' ? 'PASSWORD' : ''} for searching:`, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: args[0] === 'br' ? '❌ Cancelar' : '❌ Cancel',
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
