const util = require('util');
const connection = require('../configs/database');

const query = util.promisify(connection.query).bind(connection);

exports.getAll{{ENTITY_NAME}} = async () => {
    try {
        const entities = await query(
            "SELECT * \
            FROM {{ENTITY_NAME}}"
        );
        return entities;
    } catch (error) {
        console.error('getAll: ' + error);
        throw new Error('An error occurred while retrieving all entities');
    }
};

exports.get{{ENTITY_NAME}}ById = async (id) => {
    try {
        const entity = await query(
            "SELECT * \
            FROM {{ENTITY_NAME}} \
            WHERE id_{{ENTITY_NAME}} = ?",
             id);

        return entity;
    } catch (error) {
        console.error("getById: " + error);
        throw new Error('An error occurred while retrieving the entity by ID');
    }
};

exports.create{{ENTITY_NAME}} = async (entity) => {
    try {
        const newEntity = await query(
            "INSERT INTO {{ENTITY_NAME}} SET ?",
             entity);

        return newEntity;
    } catch (error) {
        console.error("create: " + error);
        throw new Error('An error occurred while creating the entity');
    }
};

exports.delete{{ENTITY_NAME}} = async (id) => {
    try {
        const entityDeleted = await query(
            "DELETE FROM {{ENTITY_NAME}} WHERE id_{{ENTITY_NAME}} = ?",
             id);

        return entityDeleted;
    } catch (error) {
        console.error("delete: " + error);
        throw new Error('An error occurred while deleting the entity');
    }
};

exports.update{{ENTITY_NAME}} = async (entity, id) => {
    try {
        const entityUpdated = await query(
            "UPDATE {{ENTITY_NAME}} SET ? WHERE id_{{ENTITY_NAME}} = ?",
             [entity, id]);

        return entityUpdated;
    } catch (error) {
        console.error("update: " + error);
        throw new Error('An error occurred while updating the entity');
    }
};
