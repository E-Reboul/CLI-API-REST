const Entity = require('../entities/exampleEntity');

class EntityFactory {

    static createEntity(req) {
        const bodyData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            description: req.body.description
        };

        const entityCreate = Entity.getInstance();
        entityCreate.setName(bodyData.name);
        entityCreate.setEmail(bodyData.email);
        entityCreate.setRole(bodyData.role);
        entityCreate.setDescription(bodyData.description);

        return entityCreate;
    }

    static updateEntity(req) {
        const bodyData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            description: req.body.description
        };

        const entityUpdate = Entity.getInstance();
        entityUpdate.setName(bodyData.name);
        entityUpdate.setEmail(bodyData.email);
        entityUpdate.setRole(bodyData.role);
        entityUpdate.setDescription(bodyData.description);

        return entityUpdate;
    }
}

module.exports = EntityFactory;
