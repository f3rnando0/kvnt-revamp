export default {
  async execute(ctx, input) {
    if (input === '🔍 Search') {
      await ctx.replyWithHTML(
        `Select the type of keyword you want to search:`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'URL', callback_data: 'en_search_domain' },
                {
                  text: 'Username',
                  callback_data: 'en_search_username',
                },
                { text: 'Password', callback_data: 'en_search_password' },
              ],
            ],
          },
        }
      );
    } else if (input === '🔍 Consultar') {
      await ctx.replyWithHTML(`Selecione o tipo de keyword para consulta:`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'URL', callback_data: 'br_search_domain' },
              { text: 'Usuário', callback_data: 'br_search_username' },
              { text: 'Senha', callback_data: 'br_search_password' },
            ],
          ],
        },
      });
    }
  },
};
