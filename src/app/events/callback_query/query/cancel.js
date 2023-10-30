import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const state = await userService.changeState(`none`);
    if (!state)
      return await ctx.reply(
        `Não foi possível cancelar a operação.`
      );

    return await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );
  },
};
