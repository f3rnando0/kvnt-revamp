import { url } from '../../../config/url.js';
import { ConsultaService } from '../../services/consultaService.js';
import { UserService } from '../../services/userService.js';

const domainRegex = /^(?!.*\s)(?!.*www)(?!.*http:\/\/)(?!.*https:\/\/).+$/;
const usernameRegex = /^[A-Za-z0-9_]{1,32}$/;
const passwordRegex = /^\S+$/;

export default {
  async execute(ctx, user) {
    const args = user.lastState.split('_');
    const userService = new UserService(ctx.from.id);

    if (args[1] === 'domain') {
      if (!domainRegex.test(ctx.update.message.text))
        return await ctx.reply(
          args[2] === 'br'
            ? `O domínio fornecido é inválido. Tente novamente!`
            : `Invalid domain. Try again!`
        );
    } else if (args[1] === 'username') {
      if (!usernameRegex.test(ctx.update.message.text))
        return await ctx.reply(
          args[2] === 'br'
            ? `O username fornecido é inválido. Tente novamente!`
            : `Invalid username. Try again!`
        );
    } else if (args[1] === 'password') {
      if (!passwordRegex.test(ctx.update.message.text))
        return await ctx.reply(
          args[2] === 'br'
            ? `A password fornecida é inválida. Tente novamente!`
            : `Invalid password. Try again!`
        );
    }

    const consultaService = new ConsultaService(ctx.from.id);

    const last = await consultaService.findLastestByDateAndKeyword(
      user._id,
      ctx.update.message.text
    );

    if (last.length > 0) {
      const range = last[0].range.split('-');
      await userService.changeState(
        `search_${args[1]}_rows_${args[2]}_state-${ctx.update.message.text}`
      );
      return await ctx.sendMessage(
        args[2] === 'br'
          ? `Foi identificada uma consulta antiga que vai da linha *${
              range[0]
            }* até *${range[1]}* ${
              args[1] === 'domain' || 'username' ? 'do' : 'da'
            } ${
              args[1]
            }\\. \nGostaria de retirar essas linhas de sua nova consulta?`
          : `An old search was identified, going through line *${range[0]}* to *${range[1]}* of the ${args[1]}\\. \nWould you like to slice this rows of your new search?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: args[2] === 'br' ? `👍 Sim` : `👍 Yes`,
                  callback_data: `dr_${args[1]}_${args[2]}_accept`,
                },
                {
                  text: args[2] === 'br' ? `👎 Não` : `👎 No`,
                  callback_data: `dr_${args[1]}_${args[2]}_refuse`,
                },
              ],
            ],
          },
          parse_mode: 'MarkdownV2',
        }
      );
    } else {
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
          ctx.update.message.text
        }&limit=25000&key=3d59d05c-65a3-4fb5-bd8f-ecac046be79d`
      );

      const res = await req.json();

      if (res) {
        if (res.message === 'Query realizada com sucesso.') {
          await userService.changeState(
            `search_${args[1]}_rows_${args[2]}_state-${ctx.update.message.text}`
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
                        text: `${ctx.update.message.text} - ${res.data.length}/${res.data.length}`,
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
                        text: `${ctx.update.message.text} - ${user.rowsTotalDaily}/${res.data.length}`,
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
            args[2] === 'br' ? `Nenhum resultado encontrado para esta keyword.`
            : `No results find to this keyword.`
          );
        }
      }
    }
  },
};
