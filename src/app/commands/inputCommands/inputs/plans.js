export default {
  async execute(ctx, input) {
    if (input === '💻 Planos') {
      return await ctx.replyWithHTML(
        `Selecione um plano para comprar e/ou exibir detalhes.`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Inicial', callback_data: 'br_NDplan_initial' },
                { text: 'Clássico', callback_data: 'br_NDplan_classic' },
                { text: 'VIP', callback_data: 'br_NDplan_vip' },
              ],
              [
                { text: 'Primordial', callback_data: 'br_NDplan_primordial' },
                { text: 'Business', callback_data: 'br_NDplan_business' },
                { text: 'Profissional', callback_data: 'br_NDplan_professional' },
              ],
              [{ text: 'Máximo', callback_data: 'br_NDplan_maximum' }],
            ],
          },
        }
      );
    } else if (input === '💻 Plans') {
      return await ctx.replyWithHTML(
        `Select a plan to buy and/or show details.`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Initial', callback_data: 'en_NDplan_initial' },
                { text: 'Classic', callback_data: 'en_NDplan_classic' },
                { text: 'VIP', callback_data: 'en_NDplan_vip' },
              ],
              [
                { text: 'Primordial', callback_data: 'en_NDplan_primordial' },
                { text: 'Business', callback_data: 'en_NDplan_business' },
                { text: 'Professional', callback_data: 'en_NDplan_professional' },
              ],
              [{ text: 'Maximum', callback_data: 'en_NDplan_maximum' }],
            ],
          },
        }
      );
    }
  },
};
