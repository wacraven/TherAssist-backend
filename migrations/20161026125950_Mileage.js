
exports.up = function(knex, Promise) {
  return knex.raw(
    'CREATE TABLE "Mileage" ("TripId" varchar(80) PRIMARY KEY NOT NULL,"ClinicianId" int,"Mileage" varchar(80), "Date" date);'
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'DROP TABLE "Mileage"'
  )
};
