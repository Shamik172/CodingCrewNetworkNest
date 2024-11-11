const express = require('express');
const multer = require('multer');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {upload} = require('../middleware/multerMiddleware');

const userController = require('../controller/userController');

router.get('/profile/:username', userController.getUserProfile);

router.get('/profilePage/:userId', userController.getUserProfilePage);

router.get('/skills/:userId', userController.getDefaultSkills); 

router.post('/edit/:userId', isAuth, userController.getEditUser);

router.post('/addProject', userController.postProject);

router.get('/getProject', userController.getProject);

router.get('/connections/:username', userController.getAllConnections);
// router.get('/search', userController.searchUser);

router.post('/searchAll', userController.searchAll); 
 
router.get('/e/:userId', userController.getDefaultEducation);

router.get('/exp/:userId', userController.getDefaultExperience);

router.delete('/e/:userId/:index', userController.deleteEducation);

router.delete('/:userId/:skillName', userController. deleteSkill);

router.delete('/exp/:userId/:index', userController. deleteExperience);

router.post('/e/:userId', userController.addEducation);

router.post('/coverPicture/:userId', upload.single('coverPicture'), userController.uploadCoverPicture);
 
router.post('/profilePicture/:userId', upload.single('profilePicture'), userController.uploadProfilePicture);
 
router.post('/exp/:userId', userController.addExperience);
//start by userId
router.get('/:userId/:skillName', userController.addSkill); 

module.exports = router;
