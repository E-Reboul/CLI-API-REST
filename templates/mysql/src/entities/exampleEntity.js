class Entity {
    // The single instance of the Entity class
    static instance;

    constructor() {
        // If an instance already exists, return that instance
        if (Entity.instance) {
            return Entity.instance;
        }

        // Set Properties of the entity
        this.id = 0;
        this.name = "";
        this.email = "";
        this.role = 0;
        this.description = "";

        // Store the unique instance
        Entity.instance = this;

        console.log("Constructor ok");
    }

    // Methods to set and get the properties
    setId(newId) {
        this.id = newId;
    }

    setName(newName) {
        this.name = newName;
    }

    setEmail(newEmail) {
        this.email = newEmail;
    }

    setRole(newRole) {
        this.role = newRole;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }

    getDescription() {
        return this.description;
    }

    // Static method to get the unique instance
    static getInstance() {
        // If the instance does not exist, create it
        if (!Entity.instance) {
            Entity.instance = new Entity();
        }
        // Return the unique instance
        return Entity.instance;
    }
}

module.exports = Entity;