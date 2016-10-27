
exports.up = function(knex, Promise) {
  return knex.raw(
    'CREATE TABLE "User" ("ClinicianId" varchar(80) PRIMARY KEY NOT NULL,"Username" varchar(80),"Name" varchar(80),"Password" varchar(80));'
  );
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'DROP TABLE "User"'
  )
};
