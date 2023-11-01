import { prices } from '../../../../config/prices.js';
import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');

    const userService = new UserService(ctx.from.id);

    const user = await userService.find();

    if (!user)
      return await ctx.reply(
        `Não foi possível localizar este usuário no banco de dados.`
      );

    if (user.subscription.subscribed)
      return await ctx.reply(`Você já possui um plano ativo.`);

    switch (args[1]) {
      case 'initial': {
        const price =
          args[2] === 'en'
            ? prices.en.initial[`${args[3]}`]
            : prices.br.initial[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'initial',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Initial. Tente novamente.`
              : `Unable to buy plan Initial. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano Initial com sucesso.`
            : `You've sucessfully bought plan Initial.`
        );

        return await ctx.answerCbQuery();
      }
      case 'classic': {
        const price =
          args[2] === 'en'
            ? prices.en.classic[`${args[3]}`]
            : prices.br.classic[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'classic',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Classic. Tente novamente.`
              : `Unable to buy plan Classic. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano Classic com sucesso.`
            : `You've successfully bought plan Classic.`
        );

        return await ctx.answerCbQuery();
      }
      case 'vip': {
        const price =
          args[2] === 'en'
            ? prices.en.vip[`${args[3]}`]
            : prices.br.vip[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'vip',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano VIP. Tente novamente.`
              : `Unable to buy plan VIP. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano VIP com sucesso.`
            : `You've sucessfully bought plan VIP.`
        );

        return await ctx.answerCbQuery();
      }
      case 'primordial': {
        const price =
          args[2] === 'en'
            ? prices.en.primordial[`${args[3]}`]
            : prices.br.primordial[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'primordial',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Primordial. Tente novamente.`
              : `Unable to buy plan Primordial. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano Primordial com sucesso.`
            : `You've sucessfully bought plan Primordial.`
        );

        return await ctx.answerCbQuery();
      }
      case 'business': {
        const price =
          args[2] === 'en'
            ? prices.en.business[`${args[3]}`]
            : prices.br.business[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'business',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Business. Tente novamente.`
              : `Unable to buy plan Business. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Não foi possível comprar o plano Business. Tente novamente.`
            : `Unable to buy plan Business. Try again.`
        );

        return await ctx.answerCbQuery();
      }
      case 'professional': {
        const price =
          args[2] === 'en'
            ? prices.en.professional[`${args[3]}`]
            : prices.br.professional[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'professional',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Professional. Tente novamente.`
              : `Unable to buy plan Professional. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano Professional com sucesso.`
            : `You've sucessfully bought plan Professional.`
        );

        return await ctx.answerCbQuery();
      }
      case 'maximum': {
        const price =
          args[2] === 'en'
            ? prices.en.maximum[`${args[3]}`]
            : prices.br.maximum[`${args[3]}`];

        if (
          Math.round(
            user['balance'][`${args[2] === 'br' ? 'brl' : 'usd'}`]['amount']
          ) < price
        ) {
          await ctx.reply(
            `${
              args[2] === 'br'
                ? 'Você não possui créditos suficientes.'
                : 'You dont have enough credits.'
            }`
          );
          return await ctx.answerCbQuery();
        }

        const buy = await userService.handleBuy(
          'maximum',
          args[3],
          args[2] === 'br' ? 'brl' : 'usd'
        );

        if (!buy)
          return await ctx.reply(
            args[2] === 'br'
              ? `Não foi possível comprar o plano Maximum. Tente novamente.`
              : `Unable to buy plan Maximum. Try again.`
          );

        await ctx.reply(
          args[2] === 'br'
            ? `Você comprou o plano Maximum com sucesso.`
            : `You've sucessfully bought plan Maximum.`
        );

        return await ctx.answerCbQuery();
      }
    }
  },
};
