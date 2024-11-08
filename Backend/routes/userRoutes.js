const express = require('express');
const multer = require('multer');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const userController = require('../controller/userController');

router.get('/profile/:username', userController.getUserProfile);

router.get('/profilePage/:userId', userController.getUserProfilePage);

router.get('/skills/:userId', userController.getDefaultSkills);

router.get('/edit/:username', isAuth, userController.getEditUser);

router.get('/search', userController.searchUser);
 
router.get('/e/:userId', userController.getDefaultEducation);

router.get('/exp/:userId', userController.getDefaultExperience);

router.delete('/e/:userId/:index', userController.deleteEducation);

router.delete('/:userId/:skillName', userController. deleteSkill);

router.delete('/exp/:userId/:index', userController. deleteExperience);

router.post('/e/:userId', userController.addEducation);

router.post('/coverPicture/:userId', userController.postCoverPicture);

router.post('/profilePicture/:userId',  userController.postProfilePicture);
 
router.post('/exp/:userId', userController.addExperience);
//start by userId
router.get('/:userId/:skillName', userController.addSkill); 

module.exports = router;
