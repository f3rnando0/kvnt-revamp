import { join, dirname } from 'path';
import { ConsultaService } from '../../../services/consultaService.js';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  async execute(ctx) {
    const args = ctx.update.callback_query.data.split('(');
    const consultaService = new ConsultaService();

    const doesntHasFile = await consultaService.hasUserPasswordFileOrNot(args[1]);
    if (doesntHasFile) {
      const files = fs.readdirSync(join(__dirname + `/../../../../files`));
      files.map(async (file) => {
        if (file.match(args[1])) {
          if (file === `${args[1]}.txt`) {
            const data = fs.readFileSync(
              join(__dirname + `/../../../../files/${file}`)
            );
            const reply = await ctx.replyWithDocument({
              source: data,
              filename: `${doesntHasFile.keyword}_${
                doesntHasFile.range.split('-')[1]
              }.txt`,
            });
            await consultaService.setUserPasswordFile(
              args[1],
              reply.document.file_id
            );
            fs.unlinkSync(join(__dirname + `/../../../../files/${file}`));
            return await ctx.answerCbQuery();
          }
        }
      });
    } else {
      const hasFile = await consultaService.findOne(args[1]);
      await ctx.replyWithDocument(`${hasFile.files.withoutDomain}`, {
        filename: `${hasFile.keyword}_${hasFile.range.split('-')[1]}.txt`,
      });
      return await ctx.answerCbQuery();
    }
  },
};
