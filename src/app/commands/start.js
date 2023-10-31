import { Markup } from 'telegraf';
import { UserService } from '../services/userService.js';

export default {
  async execute(ctx) {
    const userService = new UserService(ctx.from.id);

    const user = await userService.find();

    if (!user)
      return await ctx.reply(
        `Não foi possível localizar o seu usuário na database.`
      );

    await userService.changeState('none');

    if (user.preferredLanguage === 'portuguese') {
      const MAIN_MENU = Markup.keyboard([
        ['💻 Planos', '🔍 Consultar'],
        ['👤 Perfil', '💵 Recarregar'],
        [{ text: '⭐ Entre no nosso canal!' }],
      ]).resize();

      return await ctx.replyWithHTML(
        `@kvntsearch - Canal de novidades.\n@kvntstore - Canal geral.\n@pe0plearedisgusting - CEO/Dono.\n\n<b>Regras -</b> https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06`,
        MAIN_MENU
      );
    } else if (user.preferredLanguage === 'english') {
      const MAIN_MENU = Markup.keyboard([
        ['💻 Plans', '🔍 Search'],
        ['👤 Profile', '💵 Recharge'],
        [{ text: '⭐ Join our channel!' }],
      ]).resize();

      return await ctx.replyWithHTML(
        `@kvntsearch - News channel.\n@kvntstore - General Channel.\n@pe0plearedisgusting - CEO/Owner.\n\n<b>Rules -</b> https://telegra.ph/Kvnt-Rows-Terms-of-Service-07-06`,
        MAIN_MENU
      );
    }
  },
};
