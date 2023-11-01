import { url } from '../../../config/url.js';
import { createConsultaFiles } from '../../../utils/createConsultaFiles.js';
import { removeDuplicates } from '../../../utils/removeDuplicates.js';
import { ConsultaService } from '../../services/consultaService.js';
import { UserService } from '../../services/userService.js';

const rowsRegex = /^(1\d{0,4}|[1-9][0-9]{0,3}|25000)$/;

export default {
  async execute(ctx, user) {
    const userService = new UserService(user._id);
    const rows = ctx.update.message.text;
    const consultaService = new ConsultaService();
    const state = user.lastState.split('-');
    const search_type = state[0].split('_')[1];
    const lang = state[0].split('_')[3];

    if (user.lastState.match('slice')) {
      const consulta = await consultaService.findLastestByDateAndKeyword(
        user._id,
        state[1]
      );
      const range = consulta[0].range.split('-');
      if (!rowsRegex.test(rows))
        return await ctx.reply(
          lang === 'br'
            ? `Quantidade de rows inválida, tente novamente!`
            : 'Invalid rows amount, try again!'
        );

      if (rows > user.rowsTotalDaily)
        return await ctx.reply(
          lang === 'br'
            ? `Quantidade de rows superior ao seu limite diário, tente novamente!`
            : `Amount of rows above your daily limit, try again!`
        );

      const req = await fetch(
        `${
          search_type === 'domain'
            ? url.api1
            : search_type === 'username'
            ? url.api2
            : search_type === 'password'
            ? url.api3
            : ''
        }` +
          `?query=${state[1]}&limit=${
            parseInt(rows) + parseInt(range[0]) + parseInt(range[1])
          }&key=3d59d05c-65a3-4fb5-bd8f-ecac046be79d`
      );
      const res = await req.json();

      if (res) {
        if (res.message === 'Query realizada com sucesso.') {
          const removed = removeDuplicates(res.data);
          const final = removed;
          if (range[1] > removed.length)
            return await ctx.reply(
              lang === 'br'
                ? `Você já consultou todas as linhas para essa keyword.`
                : `You already search all rows for this keyword.`
            );
          removed.splice(range[0], range[1] - 1);

          const changes = await userService.modifyDailyRows(
            'search',
            removed.length
          );
          if (!changes)
            return ctx.reply(
              lang === 'br'
                ? `Não foi possível concluir a sua consulta. Contate o suporte.`
                : `Unexpected error while searching. Contact the support.`
            );

          const consultaService = new ConsultaService();
          const consulta = await consultaService.create(
            user._id,
            state[1],
            `${range[1]}-${final.length}`,
            removed.length,
            ctx.update.message.text
          );

          if (!consulta)
            return ctx.reply(
              lang === 'br'
                ? `Não foi possível concluir a sua consulta. Contate o suporte.`
                : `Unexpected error while searching. Contact the support.`
            );

          createConsultaFiles(removed, consulta);

          return await ctx.sendMessage(
            lang === 'br'
              ? `Seu arquivo está pronto!\n\nSelecione o formato do arquivo a ser exportado:`
              : `Your file is ready!\n\nSelect the file format to be exported:`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'URL:USER:PASSWORD',
                      callback_data: `file_domain(${consulta._id}`,
                    },
                    {
                      text: 'USER:PASSWORD',
                      callback_data: `file_user(${consulta._id}`,
                    },
                  ],
                ],
              },
            }
          );
        } else {
          await userService.changeState('none');
          return await ctx.reply(
            lang === 'br'
              ? `Nenhum resultado encontrado para esta keyword.`
              : `No results found for this keyword.`
          );
        }
      } else {
        return await ctx.reply(
          lang === 'br'
            ? `Não foi possível concluir a sua consulta.`
            : `Unexpected error while trying to search.`
        );
      }
    } else {
      if (!rowsRegex.test(rows))
        return await ctx.reply(
          lang === 'br'
            ? `Quantidade de rows inválida, tente novamente!`
            : 'Invalid rows amount, try again!'
        );

      if (rows > user.rowsTotalDaily)
        return await ctx.reply(
          lang === 'br'
            ? `Quantidade de rows superior ao seu limite diário, tente novamente!`
            : `Amount of rows above your daily limit, try again!`
        );

      const req = await fetch(
        `${
          search_type === 'domain'
            ? url.api1
            : search_type === 'username'
            ? url.api2
            : search_type === 'password'
            ? url.api3
            : ''
        }` +
          `?query=${state[1]}&limit=${rows}&key=3d59d05c-65a3-4fb5-bd8f-ecac046be79d`
      );
      const res = await req.json();

      if (res) {
        if (res.message === 'Query realizada com sucesso.') {
          const removed = removeDuplicates(res.data);
          const changes = await userService.modifyDailyRows(
            'search',
            removed.length
          );
          if (!changes)
            return ctx.reply(
              lang === 'br'
                ? `Não foi possível concluir a sua consulta. Contate o suporte.`
                : `Unexpected error while searching. Contact the support.`
            );

          const consultaService = new ConsultaService();
          const consulta = await consultaService.create(
            user._id,
            state[1],
            `0-${removed.length}`,
            removed.length,
            ctx.update.message.text
          );

          if (!consulta)
            return ctx.reply(
              lang === 'br'
                ? `Não foi possível concluir a sua consulta. Contate o suporte.`
                : `Unexpected error while searching. Contact the support.`
            );

          createConsultaFiles(removed, consulta);

          return await ctx.sendMessage(
            lang === 'br'
              ? `Seu arquivo está pronto!\n\nSelecione o formato do arquivo a ser exportado:`
              : `Your file is ready!\n\nSelect the file format to be exported:`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'URL:USER:PASSWORD',
                      callback_data: `file_domain(${consulta._id}`,
                    },
                    {
                      text: 'USER:PASSWORD',
                      callback_data: `file_user(${consulta._id}`,
                    },
                  ],
                ],
              },
            }
          );
        } else if (res.message === 'Nenhum resultado encontrado.') {
          await userService.changeState('none');
          return await ctx.reply(
            lang === 'br'
              ? `Nenhum resultado encontrado para esta keyword.`
              : `No results found for this keyword.`
          );
        }
      }
    }
  },
};
