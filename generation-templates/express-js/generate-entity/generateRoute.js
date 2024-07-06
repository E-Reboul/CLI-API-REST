const express = require('express');
const { getAll{{ENTITY_NAME}}, get{{ENTITY_NAME}}ById, get{{ENTITY_NAME}}ByName, create{{ENTITY_NAME}}, delete{{ENTITY_NAME}}ById, update{{ENTITY_NAME}}ById } = require('../controllers/{{ENTITY_NAME}}Controller');

const router = express.Router();

router.get('/', getAll{{ENTITY_NAME}});
router.get('/:id', get{{ENTITY_NAME}}ById);
router.post('/', create{{ENTITY_NAME}});
router.delete('/:id', delete{{ENTITY_NAME}}ById);
router.put('/:id', update{{ENTITY_NAME}}ById);

module.exports = router;
