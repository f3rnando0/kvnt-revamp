import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createConsultaFiles = (data, consulta) => {
  data.map((obj) => {
    fs.appendFileSync(
      join(__dirname + `/../files/${consulta._id}-WithDomain.txt`),
      `${obj.url}:${obj.username}:${obj.password}\n`
    );
  });

  data.map((obj) => {
    fs.appendFileSync(
      join(__dirname + `/../files/${consulta._id}.txt`),
      `${obj.username}:${obj.password}\n`
    );
  });
};
