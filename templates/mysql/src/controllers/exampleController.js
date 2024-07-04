const {
    getAllEntities,
    getEntityById,
    getEntityByName,
    createEntity,
    deleteEntity,
    updateEntity
} = require('../models/exampleModel');

const { EntityFactory } = require('../factories/exampleFactory');

exports.getAllEntities = async (request, response) => {
    try {
        const allEntities = await getAllEntities();
        response.status(200).json(allEntities);
    } catch (error) {
        console.error('Controller: getAllEntities: ', error);
        response.status(500).json({ error: "Controller: An error occurred while retrieving all entities." });
    }
};

exports.getEntityById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const entity = await getEntityById(id);
        if (entity.length === 0) {
            return response.status(404).json({ message: 'Entity not found' });
        }
        response.status(200).json(entity);
    } catch (error) {
        console.error('Controller: getEntityById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while retrieving the entity by ID." });
    }
};

exports.getEntityByName = async (request, response) => {
    try {
        const name = request.params.name;
        const entity = await getEntityByName(name);
        if (entity.length === 0) {
            return response.status(404).json({ message: 'Entity not found' });
        }
        response.status(200).json(entity);
    } catch (error) {
        console.error('Controller: getEntityByName: ', error);
        response.status(500).json({ error: "Controller: An error occurred while retrieving the entity by name." });
    }
};

exports.createEntity = async (request, response) => {
    try {
        // Use the factory to create the entity
        const newEntity = EntityFactory.createEntity(request);
        // Save the entity to the database
        const savedEntity = await createEntity(newEntity);
        response.status(201).json(savedEntity);
    } catch (error) {
        console.error('Controller: createEntity: ', error);
        response.status(500).json({ error: "Controller: An error occurred while creating the entity." });
    }
};

exports.deleteEntityById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const entityDeleted = await deleteEntity(id);
        response.status(200).json(entityDeleted);
    } catch (error) {
        console.error('Controller: deleteEntityById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while deleting the entity." });
    }
};

exports.updateEntityById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        // Use the factory to update the entity
        const updatedEntity = EntityFactory.updateEntity(request);
        // Update the entity in the database
        const savedEntity = await updateEntity(updatedEntity, id);
        response.status(200).json(savedEntity);
    } catch (error) {
        console.error('Controller: updateEntityById: ', error);
        response.status(500).json({ error: "Controller: An error occurred while updating the entity." });
    }
};
