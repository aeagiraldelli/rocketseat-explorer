import knexconfig from '../../../knexfile.js';
import knex from 'knex';

export default knex(knexconfig.development);
