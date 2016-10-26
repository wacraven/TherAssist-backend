CREATE TABLE "User" (
    "ClinicianId"         int,
    "Username"            varchar(80),
    "Name"                varchar(80),
    "Password"            varchar(80)
);

CREATE TABLE "Patient" (
    "ClinicianId"           int,
    "PatientId"             int,
    "Name"                varchar(80),
    "PrimaryContact"      varchar(80),
    "Phone"           	  varchar(80),
    "Location"            varchar(80),
    "DateOfBirth"         date,
    "Diagnosis"           varchar(80),
    "LastEvaluation"      date,
    "EvaluationFrequency" varchar(80),
    "Goal1"               varchar(80),
    "Goal2"               varchar(80),
    "Goal3"               varchar(80),
    "SessionTime"         int,
    "SessionFrequency"    varchar(80)
);

CREATE TABLE "Appointment" (
    "AppointmentId"       int,
    "PatientId"           int,
    "TimeStart"           date,
    "TimeEnd"             date,
    "Date"           	  date
);

CREATE TABLE "Mileage" (
    "TripId"              int,
    "ClinicianId"         int,
    "milage"              varchar(20)
);


--queries

SELECT * FROM "User"
WHERE "Username" = ${}

SELECT * FROM "Patient"
WHERE "ClinicianId" = ${}
