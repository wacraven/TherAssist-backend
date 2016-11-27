
exports.up = function(knex, Promise) {
  return knex.raw(
    `ALTER TABLE "Patient" ALTER COLUMN "LastEvaluation" TYPE varchar(80);
    ALTER TABLE "Patient" ALTER COLUMN "DateOfBirth" TYPE varchar(80);`
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    `ALTER TABLE "Patient" ALTER COLUMN "LastEvaluation" TYPE date;
    ALTER TABLE "Patient" ALTER COLUMN "DateOfBirth" TYPE date;`
  )
};
