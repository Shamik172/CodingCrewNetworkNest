const express = require('express');
const isAuth = require('../middleware/isAuth');
const jobController = require('../controller/jobController');

const router = express.Router();

router.post('/postjob', isAuth, jobController.createJob);

router.get('/applyjob/:jobId', isAuth, jobController.applyJob);

router.get('/getJobs/:username', isAuth, jobController.getAllJobsByUser);

router.post('/acceptJob/:username/:jobId', jobController.acceptJob);

router.post('/rejectJob/:username/:jobId', jobController.rejectJob);

router.get('/rejectAll/:jobId', jobController.rejectAll);

router.get('/getAppliedJobs', jobController.getAppliedJobsByUser);

router.get('/getAcceptedJobs', jobController.getAcceptedJobsByUser);

router.get('/getRejectedJobs', jobController.getRejectedJobsByUser);

router.post('/filterjob', jobController.filterJob);

router.get('/alljobs', jobController.getAllJobs);

router.get('/getjob/:jobId', jobController.getJob);

router.get('/savejob/:jobId', jobController.saveJob);

router.delete('/deletejob/:jobId', isAuth, jobController.deleteJob);


module.exports = router; 