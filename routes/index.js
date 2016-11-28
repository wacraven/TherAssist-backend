const express = require('express');
const router = express.Router();

const pg = require('pg');
pg.defaults.ssl = process.env.NODE_ENV === 'production';
const databaseURL = process.env.DATABASE_URL || 'postgres://localhost:5432/serverAPI';
const client = new pg.Client(databaseURL);
client.connect((err) => console.error(err));

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const request = require('request');

router.post('/api/login', function(req, res, next) {
  let found = false
  client.query(`
    SELECT * FROM "User"
    WHERE "Username" = '${req.body.Username}';
  `)
  .on('row', (data) => {
    found = true
    let dbPassword = data.Password
    if (bcrypt.compareSync(req.body.Password, dbPassword)) {
      return res.json({
        status: "OK",
        ClinicianId: data.ClinicianId
      })
    } else {
      return res.json({
        status: "Passwords do not match"
      })
    }
  })
  .on('end', () => {
    if (!found) {
      res.json({
        status: "No username found"
      })
    }
  })
});

router.post('/api/logout', function(req, res, next) {
  //logout
});


router.post('/api/register', function(req, res, next) {
  let userExists
  client.query(`
    SELECT * FROM "User"
    WHERE "Username" = '${req.body.Username}';
  `)
  .on('row', (data) => userExists = data.Username)
  .on('end', (data) => {
    if (!userExists) {
      let hashedPassword = bcrypt.hashSync(`${req.body.Password}`, salt);
      let user = {
        ClinicianId: parseInt(Date.now()),
        Name: req.body.FullName,
        Username: req.body.Username,
        Password: hashedPassword
      }
      client.query(`
        INSERT INTO "User" ("Name", "Username", "Password", "ClinicianId")
        VALUES ('${user.Name}','${user.Username}','${user.Password}',${user.ClinicianId})
      `);
      return res.json(user)
    } else {
      return res.json({
        status: 'User already exists'
      })
    }
  })
});

router.post('/api/patient/get/all', function(req, res, next) {
  let patients = []
  client.query(`
    SELECT * FROM "Patient"
    WHERE "ClinicianId" = '${req.body.ClinicianId}'
  `)
  .on('row', (row) => {
    patients.push(row)
  })
  .on('end', () => {
    return res.json(patients)
  })
});

router.post('/api/patient/get/one', function(req, res, next) {
  client.query(`
    SELECT * FROM "Patient"
    WHERE "PatientId" = '${req.body.PatientId}'
  `)
  .on('row', (data) => {
    res.json(data)
  })
});

router.post('/api/patient/new', function(req, res, next) {
  let patient = req.body
  client.query(`
    INSERT INTO "Patient" ("PatientId", "Name", "PrimaryContact", "Phone", "Location", "DateOfBirth", "Diagnosis", "LastEvaluation", "EvaluationFrequency", "Goal1", "Goal2", "Goal3", "SessionTime", "SessionFrequency", "ClinicianId")
    VALUES ('${patient.PatientId}','${patient.Name}','${patient.PrimaryContact}','${patient.Phone}','${patient.Location}','${patient.DateOfBirth}','${patient.Diagnosis}','${patient.LastEvaluation}','${patient.EvaluationFrequency}','${patient.Goal1}','${patient.Goal2}','${patient.Goal3}','${patient.SessionTime}','${patient.SessionFrequency}','${patient.ClinicianId}')
  `)
  res.json({
    status: 'OK'
  })
});

router.post('/api/patient/edit', function(req, res, next) {
  let patient = req.body
  client.query(`
    UPDATE "Patient" SET "Name" = '${patient.Name}', "PrimaryContact" = '${patient.PrimaryContact}', "Phone" = '${patient.Phone}', "Location" = '${patient.Location}', "DateOfBirth" = '${patient.DateOfBirth}', "Diagnosis" = '${patient.Diagnosis}', "LastEvaluation" = '${patient.LastEvaluation}', "EvaluationFrequency" = '${patient.EvaluationFrequency}', "Goal1" = '${patient.Goal1}', "Goal2" = '${patient.Goal2}', "Goal3" = '${patient.Goal3}', "SessionTime" = '${patient.SessionTime}', "SessionFrequency" = '${patient.SessionFrequency}'
    WHERE "PatientId" = '${patient.PatientId}'
  `)
  res.json({
    status: 'OK'
  })
});

router.post('/api/appointment/add', function(req, res, next) {
  let appointment = req.body
  client.query(`
    INSERT INTO "Appointment" ("PatientId", "AppointmentId", "TimeStart", "TimeEnd", "ClinicianId", "Title")
    VALUES ('${appointment.PatientId}','${appointment.AppointmentId}','${appointment.TimeStart}','${appointment.TimeEnd}', '${appointment.ClinicianId}', '${appointment.Title}')
  `)
  res.json({
    status: 'OK'
  })
});

router.post('/api/appointment/get/all', function(req, res, next) {
  let appointments = []
  client.query(`
    SELECT * FROM "Appointment"
    WHERE "ClinicianId" = '${req.body.ClinicianId}'
  `)
    .on('row', (data) => {
      appointments.push(data)
    })
    .on('end', () => {
      return res.json(appointments)
    })
});

router.post('/api/appointment/search', function(req, res, next) {
  let appointments = []
  client.query(`
    SELECT * FROM "Appointment"
    WHERE "Title" = '${req.body.title}' AND "TimeStart" = '${req.body.startTime}'
  `)
    .on('row', (data) => {
      appointments.push(data)
    })
    .on('end', () => {
      return res.json(appointments[0].AppointmentId)
    })
});

router.post('/api/appointment/get/one', function(req, res, next) {
  let appointments = []
  client.query(`
    SELECT * FROM "Appointment"
    WHERE "AppointmentId" = '${req.body.AppointmentId}'
  `)
  .on('row', (data) => {
    appointments.push(data)
  })
  .on('end', () => {
    return res.json(appointments[0])
  })
});

router.post('/api/mileage/get', function(req, res, next) {
  let results = []
  client.query(`
    SELECT * FROM "Mileage"
    WHERE "ClinicianId" = '${req.body.ClinicianId}'
  `)
  .on('row', (row) => {
    results.push(row)
  })
  .on('end', () => {
    return res.json(results)
  })
});

router.post('/api/mileage/new', function(req, res, next) {
  let newTrip = req.body
  let saveTrip = {}
  let requestURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${newTrip.lat},${newTrip.long}&destinations=${newTrip.dest.replace(/,/g, '').split(' ').join('+')}&key=${process.env.GOOGLE_KEY}`
  console.log(requestURL);
  request(requestURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      saveTrip = JSON.parse(body)
      saveTrip.TripId = newTrip.TripId
      saveTrip.ClinicianId = newTrip.ClinicianId
      saveTrip.ClinicianId = newTrip.ClinicianId
      saveTrip.Date = newTrip.Date
      saveTrip.Mileage = saveTrip.rows[0].elements[0].distance.text
      saveTrip.Destination = saveTrip.destination_addresses[0]
      saveTrip.Origin = saveTrip.origin_addresses[0]
      res.json(saveTrip)
      client.query(`
        INSERT INTO "Mileage" ("TripId", "ClinicianId", "Mileage", "Date", "Origin", "Destination")
        VALUES ('${saveTrip.TripId}','${saveTrip.ClinicianId}','${saveTrip.Mileage}','${saveTrip.Date}','${saveTrip.Origin}','${saveTrip.Destination}')
      `)
    } else {
      console.log(error);
    }
  })
});

module.exports = router;
