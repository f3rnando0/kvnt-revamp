import { url } from '../../../../config/url.js';
import { ConsultaService } from '../../../services/consultaService.js';
import { UserService } from '../../../services/userService.js';

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('_');

    const userService = new UserService(ctx.from.id);
    const user = await userService.find();

    const input = user.lastState.split('-');

    if (!user)
      return await ctx.reply(
        args[2] === 'br'
          ? `Não foi possível localizar o usuário no banco de dados.`
          : `Unable to find user on database.`
      );

    if (args[3] === 'refuse') {
      await ctx.answerCbQuery();
      await ctx.sendMessage(
        args[2] === 'br'
          ? `A consulta na database foi iniciada com sucesso! Os resultados serão enviados para você em breve.`
          : `You have successfully started the search, you will receive the results soon.`
      );

      const req = await fetch(
        `${
          args[1] === 'domain'
            ? url.api1
            : args[1] === 'username'
            ? url.api2
            : args[1] === 'password'
            ? url.api3
            : ''
        }?query=${
          input[1]
        }&limit=25000&key=3d59d05c-65a3-4fb5-bd8f-ecac046be79d`
      );

      const res = await req.json();

      if (res) {
        if (res.message === 'Query realizada com sucesso.') {
          if (res.data.length < user.rowsTotalDaily) {
            await ctx.sendMessage(
              args[2] === 'br'
                ? `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`
                : `Search completed successfully!\n\nFormat: request - number of rows available to you today / total rows in the database`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: `${input[1]} - ${res.data.length}/${res.data.length}`,
                        callback_data: `rows_${args[1]}_${args[2]}`,
                      },
                    ],
                  ],
                },
              }
            );
          } else {
            await ctx.sendMessage(
              args[2] === 'br'
                ? `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`
                : `Search completed successfully!\n\nFormat: request - number of rows available to you today / total rows in the database`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: `${input[1]} - ${user.rowsTotalDaily}/${res.data.length}`,
                        callback_data: `rows_${args[1]}_${args[2]}`,
                      },
                    ],
                  ],
                },
              }
            );
          }
        } else if (res.message === 'Nenhum resultado encontrado.') {
          await userService.changeState('none');
          return await ctx.reply(
            args[2] === 'br'
              ? `Nenhum resultado encontrado para esta keyword.`
              : `No results find to this keyword.`
          );
        }
      }
    } else if (args[3] === 'accept') {
      const consultaService = new ConsultaService();
      const consulta = await consultaService.findLastestByDateAndKeyword(
        ctx.from.id,
        input[1]
      );
      const range = consulta[0].range.split('-');

      await ctx.answerCbQuery();
      await ctx.sendMessage(
        args[2] === 'br'
          ? `A consulta na database foi iniciada com sucesso! Os resultados serão enviados para você em breve.`
          : `You have successfully started the search, you will receive the results soon.`
      );

      const req = await fetch(
        `${
          args[1] === 'domain'
            ? url.api1
            : args[1] === 'username'
            ? url.api2
            : args[1] === 'password'
            ? url.api3
            : ''
        }?query=${
          input[1]
        }&limit=25000&key=3d59d05c-65a3-4fb5-bd8f-ecac046be79d`
      );

      const res = await req.json();

      if (res) {
        if (res.message === 'Query realizada com sucesso.') {
          await userService.changeState(
            `slice_${args[1]}_rows_${args[2]}_state-${input[1]}`
          );

          if (res.data.length < user.rowsTotalDaily) {
            await ctx.sendMessage(
              args[2] === 'br'
                ? `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`
                : `Search completed successfully!\n\nFormat: request - number of rows available to you today / total rows in the database`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: `${input[1]} - ${res.data.length - range[1]}/${
                          res.data.length - range[1]
                        }`,
                        callback_data: `rows_${args[1]}_${args[2]}`,
                      },
                    ],
                  ],
                },
              }
            );
          } else {
            await ctx.sendMessage(
              args[2] === 'br'
                ? `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`
                : `Search completed successfully!\n\nFormat: request - number of rows available to you today / total rows in the database`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: `${input[1]} - ${user.rowsTotalDaily}/${
                          res.data.length - range[1]
                        }`,
                        callback_data: `rows_${args[1]}_${args[2]}`,
                      },
                    ],
                  ],
                },
              }
            );
          }
        } else if (res.message === 'Nenhum resultado encontrado.') {
          await userService.changeState('none');
          return await ctx.reply(
            args[2] === 'br'
              ? `Nenhum resultado encontrado para esta keyword.`
              : `No results find to this keyword.`
          );
        }
      }
    }
  },
};
