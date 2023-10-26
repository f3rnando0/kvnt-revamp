export default {
    async execute(ctx) {
        await ctx.reply(
            'Escolha o idioma de sua preferência:',
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '🇺🇸 ENG',
                      callback_data: 'en_no_user',
                    },
                    {
                      text: '🇧🇷 BR',
                      callback_data: 'br_no_user',
                    },
                  ],
                ],
              },
            },
        )
    }
}