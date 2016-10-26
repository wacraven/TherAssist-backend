const express = require('express');
const router = express.Router();
const db = require('../database');


router.post('/api/login', function(req, res, next) {
  let data = db.login(req.body.username)
  res.json(data)
  //check Password
});

router.post('/api/logout', function(req, res, next) {
  //logout
});


router.post('/api/register', function(req, res, next) {
  let user = {
    ClinicianId: parseInt(Date.now()),
    name: req.body.fullName,
    username: req.body.username,
    password: req.body.password
  }
  db.register(user)
  res.json(user)
});

router.get('/api/patient/', function(req, res, next) {
  let data = db.queryPatientData(req.ClinicianId)
  //query
});

router.get('/api/mileage/', function(req, res, next) {
  let data = db.queryMilage(req.ClinicianId)
  //query
});

module.exports = router;
