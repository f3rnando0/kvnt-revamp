export default {
  async execute(ctx, input) {
    if (input === '💵 Recharge') {
      return await ctx.replyWithHTML(
        'Click the button below to buy your credits.',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '💲Buy credits',
                  url: 'https://t.me/pe0plearedisgusting',
                },
              ],
            ],
          },
        }
      );
    } else if (input === '💵 Recarregar') {
      return await ctx.replyWithHTML(
        'Clique no botão abaixo para comprar o seus créditos.',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '💲Comprar créditos',
                  url: 'https://t.me/pe0plearedisgusting',
                },
              ],
            ],
          },
        }
      );
    }
  },
};
