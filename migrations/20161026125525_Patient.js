
exports.up = function(knex, Promise) {
  return knex.raw(
    'CREATE TABLE "Patient" ("ClinicianId" varchar(80),"PatientId" varchar(80) PRIMARY KEY NOT NULL,"Name" varchar(80),"PrimaryContact" varchar(80),"Phone" varchar(80),"Location" varchar(80),"DateOfBirth" date,"Diagnosis" varchar(80),"LastEvaluation" date,"EvaluationFrequency" varchar(80),"Goal1" varchar(80),"Goal2" varchar(80),"Goal3" varchar(80),"SessionTime" int,"SessionFrequency" varchar(80));'
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    'DROP TABLE "Patient"'
  )
};
