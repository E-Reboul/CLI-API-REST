const express = require('express');
const { getAllEntities, getEntityById, getEntityByName, createEntity, deleteEntityById, updateEntityById } = require('../controllers/exampleController');

const router = express.Router();

router.get('/', getAllEntities);
router.get('/:id', getEntityById);
router.get('/name/:name', getEntityByName);
router.post('/', createEntity);
router.delete('/:id', deleteEntityById);
router.put('/:id', updateEntityById);

module.exports = router;
