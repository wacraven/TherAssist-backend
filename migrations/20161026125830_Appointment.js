
exports.up = function(knex, Promise) {
  return knex.raw(
    'CREATE TABLE "Appointment" ("AppointmentId" varchar(80) PRIMARY KEY NOT NULL,"PatientId" varchar(80),"TimeStart" date,"TimeEnd" date,"Date" date);'
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'DROP TABLE "Appointment"'
  )
};
