import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);
    const lang = ctx.update.callback_query.data.split('_');
    const user = userService.create(lang[0]);

    if (lang[0] === 'br') {
      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );

      if (!user) return await ctx.reply(`Erro durante criação de usuário.`);

      await ctx.replyWithHTML(
        '<b>Este contrato regula o uso do Bot Kvnt Search no Telegram e estabelece regras, condições e limitações relacionadas às suas funcionalidades. Nós recomendamos que você leia e concorde com os termos para usar o nosso bot.</b>\n\n<b><a href="https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06">CLIQUE AQUI PARA LER OS TERMOS DE USUÁRIO</a></b>\n\n<b>Ao clicar no botão "Aceitar", você concorda com TODAS as regras e condições estabelecidas para o uso do Kvnt Search. Após confirmar o consentimento para usar o bot, não aceitamos reclamações. Ao clicar em "Aceitar", você confirma que leu e concorda com os termos estabelecidos para o uso do bot. Agradecemos pela preferência, e faça um bom uso!</b>',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '✅ Aceitar',
                  callback_data: 'br_creation_terms_accepted',
                },
                {
                  text: '❌ Recusar',
                  callback_data: 'br_creation_terms_refused',
                },
              ],
            ],
          },
        }
      );

      await ctx.answerCbQuery();
      return;
    } else if (lang[0] === 'en') {
      const userService = new UserService(ctx.from.id);
      const lang = ctx.update.callback_query.data.split('_');
      const user = userService.create(lang[0]);

      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );

      if (!user) return await ctx.reply(`Erro durante criação de usuário.`);

      await ctx.replyWithHTML(
        '<b>This contract regulates the using of Kvnt Search on Telegram and estabilish rules, conditions and limitations related to our functionalities. We recommend you to read and agree with our terms to use our bot.</b>\n\n<b><a href="https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06">CLICK HERE TO READ THE USER\'S TERMS</a></b>\n\n<b>When clicking the button "Accept", you agree with all rules and conditions estabilished for using Kvnt Search. After accepting the consent for using the bot, we do not accept complaints. When click the button "Accept", you confirms that you\'ve read and agree with the terms estabilished for the using of the bot. We appreciate the preference, and make a good use of the bot!</b>',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '✅ Accept',
                  callback_data: 'en_creation_terms_accepted',
                },
                {
                  text: '❌ Decline',
                  callback_data: 'en_creation_terms_declined',
                },
              ],
            ],
          },
        }
      );

      await ctx.answerCbQuery();
      return;
    }
  },
};
