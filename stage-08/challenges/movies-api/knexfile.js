import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'db.sqlite'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      ),
    },
  },
};
