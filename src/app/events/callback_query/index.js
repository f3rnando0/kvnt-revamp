import fs from 'fs';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { UserService } from '../../services/userService.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const queryFiles = fs
  .readdirSync(path.join(__dirname + '/query'))
  .filter((file) => file.endsWith('.js'));

export default {
  async execute(context) {
    const ctx = context[0];

    const userService = new UserService(context[0].from.id);
    await userService.handleResetDailyRows()
    
    queryFiles.map(async (file) => {
        if(ctx.update.callback_query.data.match(file.replace('.js', ''))) {
            const imported = await import(`./query/${file}`);

            imported.default.execute(ctx);
        }
    })
  },
};
