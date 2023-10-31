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
          `O domínio fornecido é inválido. Tente novamente!`
        );
    } else if (args[1] === 'username') {
      if (!usernameRegex.test(ctx.update.message.text))
        return await ctx.reply(
          `O username fornecido é inválido. Tente novamente!`
        );
    } else if (args[1] === 'password') {
      if (!passwordRegex.test(ctx.update.message.text))
        return await ctx.reply(
          `A password fornecida é inválida. Tente novamente!`
        );
    }

    const consultaService = new ConsultaService(ctx.from.id);

    const last = await consultaService.findLastestByDateAndKeyword(
      ctx.update.message.text
    );

    if (last.length > 0) {
      const range = last.range.split('-')
      return await ctx.sendMessage(
        `Foi identificada uma consulta antiga que vai da linha **${range[0]}** até ${range[1]} do/da ${args[1]}. Gostaria de retirar essas linhas de sua nova consulta?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: `👍 Sim`,
                  callback_data: `dr_rows_${args[1]}_${args[2]}`,
                },
                {
                  text: `👎 Não`,
                  callback_data: `dr_rows_${args[1]}_${args[2]}`,
                },
              ],
            ],
          },
        }
      );
    } else {
      await ctx.sendMessage(
        `A consulta na database foi iniciada com sucesso! Os resultados serão enviados para você em breve.`
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
          await userService.changeState(`search_${args[1]}_rows_${args[2]}_state-${ctx.update.message.text}`)
          if (res.data.length < user.rowsTotalDaily) {
            await ctx.sendMessage(
              `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`,
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
              `Consulta finalizada com sucesso!\n\nFormato: "url - quantidade total de linhas que você pode pegar hoje / total de resultados encontrados na database"`,
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
            `Nenhum resultado encontrado para esta keyword.`
          );
        }
      }
    }
  },
};
