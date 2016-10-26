//ROUTES PLANNING DOC

// login
req: `/api/:username`
example res: {
  clinicianId: '1234asdf',
  username: 'emily',
  password: '-insert hash here-'
}

// logout
req: `/api/:username`
example res: {
  logout: 'success'
}

// get patient data
req: `/api/patient/:clinicianId`
example res: {
  patientId: 'asdf123',
  name: 'Little Johnny Smith',
  primaryContact: '',
  phone: '',
  location: '123 main st',
  dateOfBirth: '-date object-',
  diagnosis: '',
  lastEvaluation: '-date object-',
  evaluationFrequencyInWeeks: number,
  goal1: '',
  goal2: '',
  goal3: '',
  sessionTime: '',
  sessionFrequency: '',
  clinicianId: '1234asdf'
}

// milage data
req: `/api/milage/:clinicianId`
example res: {
  totalTripsThisWeek: number;
  totalMilageThisWeek: '20miles'
}

// get appointments
req: `/api/appointment/:clinicianId`
example res: {
  appointmentId: {
    date: '-date object-',
    timeStart: '-date object-',
    timeEnd: '-date object-',
    patientId: 'asdf123'
  },
  appointmentId: {
    date: '-date object-',
    timeStart: '-date object-',
    timeEnd: '-date object-',
    patientId: 'asdf123'
  }
}
