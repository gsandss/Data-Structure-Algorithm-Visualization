const express = require('express');
const router = express.Router();
const controller = require('../controllers/sortingController');

router.get('/', controller.listAlgorithms);
router.post('/start', controller.startSimulation);
router.get('/:id', controller.getState);
router.post('/:id/step', controller.stepSimulation);
router.post('/:id/run', controller.runToCompletion);

module.exports = router;
