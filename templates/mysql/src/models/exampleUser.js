import util from 'util';
import connection from "../config/database";

const query = util.promisify(connection.query).bind(connection);

exports.getAllUsers = async () => {
    try {
        const users = await query(
            "SELECT user.name, user.mail, user.password \
            FROM user \
            "
        );
        // return users[]
        return users;
    } catch (error) {
        // handle error
        console.error('getAll : ' + error);
        throw new Error('An error occurred while retrieving all users');
    };
};


exports.getUserById = async (id) => {
    try {
        const user = await query(
            "SELECT user.name, user.mail, user.password \
            FROM user \
            WHERE id_user = ? \
            ", 
             id);
    
        return user;
    } catch (error) {
        console.error("getById : " + error);
        throw new Error('An error occurred while retrieving the user by ID');
    };
};

exports.getUserByName = async (name) => {
    try {
        const user = await query(
            "SELECT user.name, user.mail, user.password \
            FROM user \
            WHERE user.name = ? \
            ", 
             name);

        return user;
    } catch (error) {
        console.error("getByName : " + error);
        throw new Error('An error occurred while retrieving the user by name');
    };
};

exports.createUser = async (user) => {
    try {
        const newUser = await query(
            "INSERT INTO user \
            SET ? \
            ", 
             user);

        return newUser;
    } catch (error) {
        console.error("create : " + error);
        throw new Error('An error occurred while creating the user');
    };
};

exports.deleteUser = async (id) => {
    try{
        const userDeleted = await query(
            "DELETE FROM utilisateurs \
            WHERE user.id_user = ? \
            ", 
             id);

        return userDeleted;
    } catch (error) {
        console.error("delete : " + error);
        throw new Error('An error occurred while deleting the user');
    };
};


exports.updateUser = async (user, id) => {
    try {
        const userUpdated = await query(
            "UPDATE user \
            SET ? \
            WHERE user.id_user = ? \
            ", 
             [user, id]);
             
        return userUpdated;
    } catch (error) {
        console.error("update : " + error);
        throw new Error('An error occurred while updating the user');
    };
};

exports.loginByMail = async (mail) => {
    try {
       const log = await query(
        "SELECT user.name, user.mail, user.password \
        FROM user \
        WHERE user.mail = ? \
        ",
         mail);

        return log;
    } catch (error) {
        console.error("login : " + error);
        throw new Error('An error occurred while retrieving the user by email');
    };
};
