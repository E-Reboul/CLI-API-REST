class {{ENTITY_NAME}}Entity {
    // The single instance of the Entity class
    static instance;

    constructor() {
        // If an instance already exists, return that instance
        if ({{ENTITY_NAME}}Entity.instance) {
            return {{ENTITY_NAME}}Entity.instance;
        }

        // Set Properties of the entity

        // Store the unique instance
        {{ENTITY_NAME}}Entity.instance = this;

        console.log("Constructor ok");
    }

    // Set method for attributes of entity 
    
    // Get method for attributes of entity

    // Static method to get the unique instance
    static getInstance() {
        // If the instance does not exist, create it
        if (!{{ENTITY_NAME}}Entity.instance) {
            {{ENTITY_NAME}}Entity.instance = new {{ENTITY_NAME}}Entity();
        }
        // Return the unique instance
        return {{ENTITY_NAME}}Entity.instance;
    }
}

module.exports = {{ENTITY_NAME}}Entity;