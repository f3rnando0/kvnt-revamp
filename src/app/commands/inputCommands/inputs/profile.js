import { ConsultaService } from '../../../services/consultaService.js';
import dayjs from 'dayjs';

export default {
  async execute(ctx, input, user) {
    const consultaService = new ConsultaService();
    const consultas = await consultaService.findManyById(ctx.from.id);

    if (input === '👤 Profile') {
      if (!user.subscription.subscribed) {
        return await ctx.sendMessage(
          `Hello user\\!\n• ID: \`${user.id}\`\n\n ┏ Balance: *${
            user.balance.brl.amount + user.balance.usd.amount
          }*\n ┠ Active Plan: ${
            user.subscription.subscriptionType === 0
              ? '*None*'
              : user.subscription.subscriptionType === 1
              ? '*Initial*'
              : user.subscription.subscriptionType === 2
              ? '*Classic*'
              : user.subscription.subscriptionType === 3
              ? '*VIP*'
              : user.subscription.subscriptionType === 4
              ? '*Primordial*'
              : user.subscription.subscriptionType === 5
              ? '*Business*'
              : user.subscription.subscriptionType === 6
              ? '*Profissional*'
              : user.subscription.subscriptionType === 7
              ? '*Máximo*'
              : '*None*'
          }\n ┠ Total searches: *${
            consultas.length
          }*\n ┗ Total lines searched: *${
            user.rowsTotal
          }*\n\nDiscount \\-25% on all subscriptions in honor of the opening of our bot\\."`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      } else {
        return await ctx.sendMessage(
          `Hello user\\!\n• ID: \`${user.id}\`\n\n ┏ Balance: *${
            user.balance.brl.amount + user.balance.usd.amount
          }*\n ┠ Active Plan: ${
            user.subscription.subscriptionType === 0
              ? '*None*'
              : user.subscription.subscriptionType === 1
              ? '*Initial*'
              : user.subscription.subscriptionType === 2
              ? '*Classic*'
              : user.subscription.subscriptionType === 3
              ? '*VIP*'
              : user.subscription.subscriptionType === 4
              ? '*Primordial*'
              : user.subscription.subscriptionType === 5
              ? '*Business*'
              : user.subscription.subscriptionType === 6
              ? '*Profissional*'
              : user.subscription.subscriptionType === 7
              ? '*Máximo*'
              : '*None*'
          }\n ┠ Total searches: *${
            consultas.length
          }*\n ┠ Total lines searched: *${
            user.rowsTotal
          }*\n ┠ Daily row limit: *${user.rowsTotalDaily}*${
            user.subscription.subscribed
              ? `\n ┗ Expires in: `.concat(
                  dayjs(user.subscription.expiresAt).toString()
                )
              : ''
          }\n\nDiscount \\-25% on all subscriptions in honor of the opening of our bot\\."`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      }
    } else if (input === '👤 Perfil') {
      if (!user.subscription.subscribed) {
        return await ctx.sendMessage(
          `Olá, caro usuário\\!\n• ID: \`${user.id}\`\n\n ┏ Saldo: *${
            user.balance.brl.amount + user.balance.usd.amount
          }*\n ┠ Plano: ${
            user.subscription.subscriptionType === 0
              ? '*Nenhum*'
              : user.subscription.subscriptionType === 1
              ? '*Initial*'
              : user.subscription.subscriptionType === 2
              ? '*Classic*'
              : user.subscription.subscriptionType === 3
              ? '*VIP*'
              : user.subscription.subscriptionType === 4
              ? '*Primordial*'
              : user.subscription.subscriptionType === 5
              ? '*Business*'
              : user.subscription.subscriptionType === 6
              ? '*Profissional*'
              : user.subscription.subscriptionType === 7
              ? '*Máximo*'
              : '*Nenhum*'
          }\n ┠ Total de consultas no BOT: *${
            consultas.length
          }*\n ┗ Total de linhas consultadas: *${
            user.rowsTotal
          }*\n\nTodos os planos estão com 25% de desconto devido à inauguração do Kvnt Search\\.`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      } else {
        return await ctx.sendMessage(
          `Olá, caro usuário\\!\n• ID: \`${user.id}\`\n\n ┏ Saldo: *${
            user.balance.brl.amount + user.balance.usd.amount
          }*\n ┠ Plano: ${
            user.subscription.subscriptionType === 0
              ? '*Nenhum*'
              : user.subscription.subscriptionType === 1
              ? '*Initial*'
              : user.subscription.subscriptionType === 2
              ? '*Classic*'
              : user.subscription.subscriptionType === 3
              ? '*VIP*'
              : user.subscription.subscriptionType === 4
              ? '*Primordial*'
              : user.subscription.subscriptionType === 5
              ? '*Business*'
              : user.subscription.subscriptionType === 6
              ? '*Profissional*'
              : user.subscription.subscriptionType === 7
              ? '*Máximo*'
              : '*Nenhum*'
          }\n ┠ Total de consultas no BOT: *${
            consultas.length
          }*\n ┠ Total de linhas consultadas: *${
            user.rowsTotal
          }*\n ┠ Total de linhas restantes hoje: *${user.rowsTotalDaily}*${
            user.subscription.subscribed
              ? `\n ┗ Expira em: `.concat(
                  dayjs(user.subscription.expiresAt).toString()
                )
              : ''
          }\n\nTodos os planos estão com 25% de desconto devido à inauguração do Kvnt Search\\.`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      }
    }
  },
};
