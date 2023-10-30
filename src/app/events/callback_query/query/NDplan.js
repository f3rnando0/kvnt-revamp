import { prices } from '../../../../config/prices.js';
import { rows } from '../../../../config/rows.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');
    switch (args[2]) {
      case 'initial': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Inicial*\n\nLimite de linhas diárias: *${rows.inital}*\n\nPreços:\nSemanal \\- *${prices.br.initial.semanal}* créditos\nMensal \\- *${prices.br.initial.mensal}* créditos\nTrimestral \\- *${prices.br.initial.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
                `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_initial_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_initial_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_initial_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*initial* Plan\n\nDaily rows limit: *${rows.inital}*\n\nPrices:\nWeekly \\- *${prices.en.initial.semanal}* credits\nMonthly \\- *${prices.en.initial.mensal}* credits\nQuarterly \\- *${prices.en.initial.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
                `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_initial_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_initial_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_initial_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'classic': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Clássico*\n\nLimite de linhas diárias: *${rows.classic}*\n\nPreços:\nSemanal \\- *${prices.br.classic.semanal}* créditos\nMensal \\- *${prices.br.classic.mensal}* créditos\nTrimestral \\- *${prices.br.classic.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_classic_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_classic_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_classic_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*Classic* Plan\n\nDaily rows limit: *${rows.classic}*\n\nPrices:\nWeekly \\- *${prices.en.classic.semanal}* credits\nMonthly \\- *${prices.en.classic.mensal}* credits\nQuarterly \\- *${prices.en.classic.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_classic_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_classic_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_classic_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'vip': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *VIP*\n\nLimite de linhas diárias: *${rows.vip}*\n\nPreços:\nSemanal \\- *${prices.br.vip.semanal}* créditos\nMensal \\- *${prices.br.vip.mensal}* créditos\nTrimestral \\- *${prices.br.vip.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_vip_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_vip_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_vip_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*VIP* Plan\n\nDaily rows limit: *${rows.vip}*\n\nPrices:\nWeekly \\- *${prices.en.vip.semanal}* credits\nMonthly \\- *${prices.en.vip.mensal}* credits\nQuarterly \\- *${prices.en.vip.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_vip_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_vip_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_vip_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'primordial': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Primordial*\n\nLimite de linhas diárias: *${rows.primordial}*\n\nPreços:\nSemanal \\- *${prices.br.primordial.semanal}* créditos\nMensal \\- *${prices.br.primordial.mensal}* créditos\nTrimestral \\- *${prices.br.primordial.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_primordial_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_primordial_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_primordial_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*Primordial* Plan\n\nDaily rows limit: *${rows.primordial}*\n\nPrices:\nWeekly \\- *${prices.en.primordial.semanal}* credits\nMonthly \\- *${prices.en.primordial.mensal}* credits\nQuarterly \\- *${prices.en.primordial.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_primordial_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_primordial_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_primordial_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'business': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Business*\n\nLimite de linhas diárias: *${rows.business}*\n\nPreços:\nSemanal \\- *${prices.br.business.semanal}* créditos\nMensal \\- *${prices.br.business.mensal}* créditos\nTrimestral \\- *${prices.br.business.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_business_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_business_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_business_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*Business* Plan\n\nDaily rows limit: *${rows.business}*\n\nPrices:\nWeekly \\- *${prices.en.business.semanal}* credits\nMonthly \\- *${prices.en.business.mensal}* credits\nQuarterly \\- *${prices.en.business.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_business_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_business_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_business_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'professional': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Profissional*\n\nLimite de linhas diárias: *${rows.professional}*\n\nPreços:\nSemanal \\- *${prices.br.professional.semanal}* créditos\nMensal \\- *${prices.br.professional.mensal}* créditos\nTrimestral \\- *${prices.br.professional.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_professional_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_professional_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_professional_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*Professional* Plan\n\nDaily rows limit: *${rows.professional}*\n\nPrices:\nWeekly \\- *${prices.en.professional.semanal}* credits\nMonthly \\- *${prices.en.professional.mensal}* credits\nQuarterly \\- *${prices.en.professional.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_professional_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_professional_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_professional_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
      case 'maximum': {
        if (args[0] === 'br') {
          await ctx.replyWithHTML(
            `Plano *Máximo*\n\nLimite de linhas diárias: *${rows.maximum}*\n\nPreços:\nSemanal \\- *${prices.br.maximum.semanal}* créditos\nMensal \\- *${prices.br.maximum.mensal}* créditos\nTrimestral \\- *${prices.br.maximum.trimestral}* créditos\n\nClique nos botões abaixo para escolher a duração do seu plano:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Semanal',
                      callback_data: 'plan_maximum_br_semanal',
                    },
                    {
                      text: 'Mensal',
                      callback_data: 'plan_maximum_br_mensal',
                    },
                    {
                      text: 'Trimestral',
                      callback_data: 'plan_maximum_br_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        } else if (args[0] === 'en') {
          await ctx.replyWithHTML(
            `*Maximum* Plan\n\nDaily rows limit: *${rows.maximum}*\n\nPrices:\nWeekly \\- *${prices.en.maximum.semanal}* credits\nMonthly \\- *${prices.en.maximum.mensal}* credits\nQuarterly \\- *${prices.en.maximum.trimestral}* credits\n\nClick on the buttons below to choose your plan duration:
            `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Weekly',
                      callback_data: 'plan_maximum_en_semanal',
                    },
                    {
                      text: 'Monthly',
                      callback_data: 'plan_maximum_en_mensal',
                    },
                    {
                      text: 'Quarterly',
                      callback_data: 'plan_maximum_en_trimestral',
                    },
                  ],
                ],
              },
              parse_mode: 'MarkdownV2',
            }
          );
          await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
          );

          return await ctx.answerCbQuery();
        }
      }
    }
  },
};
