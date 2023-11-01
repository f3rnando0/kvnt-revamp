import { Markup } from 'telegraf';
import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');

    if (args[3] === 'accepted') {
      const userService = new UserService(ctx.from.id);

      const accept = await userService.acceptTerms();

      if (!accept)
        return await ctx.reply(
          args[0] === 'br'
            ? `Não foi possível aceitar os termos. Tente novamente.`
            : `Unable to accept terms. Try again.`
        );

      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );

      const MAIN_MENU =
        args[0] === 'br'
          ? Markup.keyboard([
              ['💻 Planos', '🔍 Consultar'],
              ['👤 Perfil', '💵 Recarregar'],
              [{ text: '⭐ Entre no nosso canal!' }],
            ]).resize()
          : Markup.keyboard([
              ['💻 Plans', '🔍 Search'],
              ['👤 Profile', '💵 Recharge'],
              [{ text: '⭐ Join our channel!' }],
            ]).resize();

      await ctx.replyWithHTML(
        args[0] === 'br'
          ? `@kvntsearch - Canal de novidades.\n@kvntstore - Canal geral.\n@pe0plearedisgusting - CEO/Dono.\n\n<b>Regras -</b> https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06`
          : `@kvntsearch - News channel.\n@kvntstore - General Channel.\n@pe0plearedisgusting - CEO/Owner.\n\n<b>Rules -</b> https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06`,
        MAIN_MENU
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
