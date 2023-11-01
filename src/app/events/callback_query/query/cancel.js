import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const args = ctx.update.callback_query.data.split('_')
    const state = await userService.changeState(`none`);
    if (!state)
      return await ctx.reply(
        args[2] === 'br'
          ? `Não foi possível cancelar a operação.`
          : `Unable to cancel this operation.`
      );

    return await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );
  },
};
