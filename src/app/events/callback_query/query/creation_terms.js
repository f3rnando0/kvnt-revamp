import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');

    if (args[3] === 'accepted') {
      const userService = new UserService(ctx.from.id);

      const accept = await userService.acceptTerms();

      if (!accept)
        return await ctx.reply(
          `Não foi possível aceitar os termos. Tente novamente.`
        );

      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );

      return await ctx.answerCbQuery();
    } else if (args[3] === 'refused') {
      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );

      return await ctx.answerCbQuery();
    }
  },
};
