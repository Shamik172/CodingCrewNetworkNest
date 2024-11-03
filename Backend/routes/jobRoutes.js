const express = require('express');
const isAuth = require('../middleware/isAuth');
const jobController = require('../controller/jobController');

const router = express.Router();

router.post('/postjob', isAuth, jobController.createJob);

router.post('/applyjob/:jobId', isAuth, jobController.applyJob);

router.delete('/deletejob/:jobId', isAuth, jobController.deleteJob);

module.exports = router; 