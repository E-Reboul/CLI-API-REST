const {{ENTITY_NAME}}Entity = require('../entities/{{ENTITY_NAME}}Entity');

class {{ENTITY_NAME}}Factory {

    static create{{ENTITY_NAME}}(req) {
        const bodyData = {
            //get attributes of body request

            // name: req.body.name,
            // email: req.body.email,
            // role: req.body.role,
            // description: req.body.description
        };

        const entityCreate = {{ENTITY_NAME}}Entity.getInstance();
        //set instance with attributes for create

        // entityCreate.setName(bodyData.name);
        // entityCreate.setEmail(bodyData.email);
        // entityCreate.setRole(bodyData.role);
        // entityCreate.setDescription(bodyData.description);

        return entityCreate;
    }

    static updateEntity(req) {
        const bodyData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            description: req.body.description
        };

        const entityUpdate = {{ENTITY_NAME}}Entity.getInstance();
        //set instance with attributes for update

        // entityUpdate.setName(bodyData.name);
        // entityUpdate.setEmail(bodyData.email);
        // entityUpdate.setRole(bodyData.role);
        // entityUpdate.setDescription(bodyData.description);

        return entityUpdate;
    }
}

module.exports = {{ENTITY_NAME}}Factory;
