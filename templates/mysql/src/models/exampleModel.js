const util = require('util');
const connection = require('../configs/database');

const query = util.promisify(connection.query).bind(connection);

exports.getAllEntities = async () => {
    try {
        const entities = await query(
            "SELECT example.name, example.mail, example.password \
            FROM example"
        );
        return entities;
    } catch (error) {
        console.error('getAll: ' + error);
        throw new Error('An error occurred while retrieving all entities');
    }
};

exports.getEntityById = async (id) => {
    try {
        const entity = await query(
            "SELECT example.name, example.mail, example.password \
            FROM example \
            WHERE id_example = ?",
             id);

        return entity;
    } catch (error) {
        console.error("getById: " + error);
        throw new Error('An error occurred while retrieving the entity by ID');
    }
};

exports.getEntityByName = async (name) => {
    try {
        const entity = await query(
            "SELECT example.name, example.mail, example.password \
            FROM example \
            WHERE example.name = ?",
             name);

        return entity;
    } catch (error) {
        console.error("getByName: " + error);
        throw new Error('An error occurred while retrieving the entity by name');
    }
};

exports.createEntity = async (entity) => {
    try {
        const newEntity = await query(
            "INSERT INTO example SET ?",
             entity);

        return newEntity;
    } catch (error) {
        console.error("create: " + error);
        throw new Error('An error occurred while creating the entity');
    }
};

exports.deleteEntity = async (id) => {
    try {
        const entityDeleted = await query(
            "DELETE FROM example WHERE id_example = ?",
             id);

        return entityDeleted;
    } catch (error) {
        console.error("delete: " + error);
        throw new Error('An error occurred while deleting the entity');
    }
};

exports.updateEntity = async (entity, id) => {
    try {
        const entityUpdated = await query(
            "UPDATE example SET ? WHERE id_example = ?",
             [entity, id]);

        return entityUpdated;
    } catch (error) {
        console.error("update: " + error);
        throw new Error('An error occurred while updating the entity');
    }
};
