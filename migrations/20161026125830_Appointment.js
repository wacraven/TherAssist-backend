
exports.up = function(knex, Promise) {
  return knex.raw(
    'CREATE TABLE "Appointment" ("AppointmentId" varchar(80) PRIMARY KEY NOT NULL,"PatientId" varchar(80),"ClinicianId" varchar(80),"TimeStart" varchar(80),"TimeEnd" varchar(80),"Title" varchar(80));'
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'DROP TABLE "Appointment"'
  )
};
