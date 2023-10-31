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
    const state = user.lastState.split('-');
    const search_type = state[0].split('_')[1];
    if (!rowsRegex.test(rows))
      return await ctx.reply(`Quantidade de rows inválida, tente novamente!`);

    if (rows > user.rowsTotalDaily)
      return await ctx.reply(
        `Quantidade de rows superior ao seu limite diário, tente novamente!`
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
            `Não foi possível concluir a sua consulta. Contate o suporte.`
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
            `Não foi possível concluir a sua consulta. Contate o suporte.`
          );

        createConsultaFiles(removed, consulta);

        return await ctx.sendMessage(
          `Seu arquivo está pronto!\n\nSelecione o formato do arquivo a ser exportado:`,
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
          `Nenhum resultado encontrado para esta keyword.`
        );
      }
    }
  },
};
