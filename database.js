'use strict';

const pg = require('pg');
const databaseURL = process.env.DATABASE_URL || 'postgres://localhost:5432/serverAPI';

const client = new pg.Client(databaseURL);
client.connect();

module.exports.login = (username) =>{
  client.query(`
      SELECT * FROM "User"
      WHERE "Username" = '${username}';
    `)
    .on('row', (data) => data)
}

module.exports.register = (user) =>{
  client.query(`
    INSERT INTO "User" ("Name", "Username", "Password", "ClinicianId")
    VALUES ('${user.name}','${user.username}','${user.password}',${user.ClinicianId})
  `);
}

module.exports.queryPatient = (clinicianId) =>{
  return client.query(
  `SELECT * FROM "Patient"
  WHERE "ClinicianId" = ${clinicianId}`);
}
