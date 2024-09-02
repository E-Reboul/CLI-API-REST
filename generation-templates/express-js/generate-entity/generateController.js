const {
    getAll{{ENTITY_NAME}},
    get{{ENTITY_NAME}}ById,
    get{{ENTITY_NAME}}ByName,
    create{{ENTITY_NAME}},
    delete{{ENTITY_NAME}},
    update{{ENTITY_NAME}}
} = require('../models/{{ENTITY_NAME}}Model');

const { {{ENTITY_NAME}}Factory } = require('../factories/{{ENTITY_NAME}}Factory');

exports.getAll{{ENTITY_NAME}} = async (request, response) => {
    try {
        const allEntities = await getAll{{ENTITY_NAME}}();
        response.status(200).json(allEntities);
    } catch (error) {
        console.error('Controller: getAll{{ENTITY_NAME}}: ', error);
        response.status(500).json({ error: "Controller: An error occurred while retrieving all entities." });
    }
};

exports.get{{ENTITY_NAME}}ById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const entity = await get{{ENTITY_NAME}}ById(id);
        if (entity.length === 0) {
            return response.status(404).json({ message: 'Entity not found' });
        }
        response.status(200).json(entity);
    } catch (error) {
        console.error('Controller: get{{ENTITY_NAME}}ById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while retrieving the entity by ID." });
    }
};

exports.create{{ENTITY_NAME}} = async (request, response) => {
    try {
        // Use the factory to create the entity
        const newEntity = {{ENTITY_NAME}}Factory.create{{ENTITY_NAME}}(request);
        // Save the entity to the database
        const savedEntity = await create{{ENTITY_NAME}}(newEntity);
        response.status(201).json(savedEntity);
    } catch (error) {
        console.error('Controller: create{{ENTITY_NAME}}: ', error);
        response.status(500).json({ error: "Controller: An error occurred while creating the entity." });
    }
};

exports.delete{{ENTITY_NAME}}ById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const entityDeleted = await delete{{ENTITY_NAME}}(id);
        response.status(200).json(entityDeleted);
    } catch (error) {
        console.error('Controller: delete{{ENTITY_NAME}}ById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while deleting the entity." });
    }
};

exports.update{{ENTITY_NAME}}ById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        // Use the factory to update the entity
        const updatedEntity = {{ENTITY_NAME}}Factory.update{{ENTITY_NAME}}(request);
        // Update the entity in the database
        const savedEntity = await update{{ENTITY_NAME}}(updatedEntity, id);
        response.status(200).json(savedEntity);
    } catch (error) {
        console.error('Controller: update{{ENTITY_NAME}}ById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while updating the entity." });
    }
};
