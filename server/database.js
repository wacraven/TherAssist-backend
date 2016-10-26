'use strict';

const pg = require('pg');
const databaseURL = process.env.DATABASE_URL || 'postgres://localhost:5432/serverAPI';

const client = new pg.Client(databaseURL);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
