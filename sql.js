var mysql = require('mysql2/promise');

// Stworzona baza danych
async function workOnDataBase(sql) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",  // wpisz własne
        password: "root",   // wpisz własne
    });

    try {
        var result = await connection.query(sql);
        return result
    } finally {
        await connection.end();
    }
}

// funkcja do wysyłania żądan do bazy danych
async function action(sql, db, query_values) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",   //wpisz własne
        password: "root",    //wpisz własne na zmiane hasła w sql: ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
        database: db
    });

    try {
        var result = await connection.query(sql, query_values);
        return result;
    } finally {
        await connection.end();
    }
}

// Dodane na potrzeby index.js
class DBUser {
    constructor(name, surname) {
        // if(name == null || surname == null) { throw new Error("Name and surname cannot be nulls."); }
        if (typeof name !== 'string' || typeof surname !== 'string') { throw new Error("Name and surname must be of string types."); }
        if (name.length === 0 || surname.length === 0) { throw new Error("Name and surname must be at least 1 character long."); }
        this.name = name;
        this.surname = surname;
    }
}

async function index_create_db(name) {
    try {
        await workOnDataBase(`CREATE DATABASE IF NOT EXISTS ${name}`);
        await action("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), surname VARCHAR(255))", name);
    } catch (err) {
        console.error(err);
    }
}

async function index_get_user(user, DBname) {
    if (!(user instanceof DBUser)) { throw new Error("User parameter must be of type DBUser."); }

    const [rows] = await action(
        'SELECT * FROM `users` WHERE `name` = ? AND `surname` = ?',
        DBname,
        [user.name, user.surname]);

    return rows;
}

async function index_get_user_id(user, DBname) {
    if (!(user instanceof DBUser)) { throw new Error("User parameter must be of type DBUser."); }

    const [rows] = await action(
        'SELECT id FROM `users` WHERE `name` = ? AND `surname` = ?',
        DBname,
        [user.name, user.surname]);

    console.log(rows[0].id)
    return rows[0].id;
}

async function index_get_all_users(name) {
    const [rows] = await action(
        'SELECT * FROM `users`', name
    )
    return rows
}

async function index_create_user(user, DBname) {
    if (!(user instanceof DBUser)) { throw new Error("User parameter must be of type DBUser."); }

    const [result] = await action(
        'INSERT INTO `users` (`name`, `surname`) VALUES (?, ?)',
        DBname,
        [user.name, user.surname]);

    return result;
}

async function index_delete_user(user, DBname) {
    const [result] = await action(
        'DELETE FROM `users` WHERE `name` = ? AND `surname` = ?',
        DBname,
        [id]
    );

    return result;
}

async function index_update_user(user_id, user_updated, DBname) {
    const [result] = await action(
        'UPDATE `users` SET `name` = ?, `surname` = ? WHERE `name` = ? AND `surname` = ?',
        DBname,
        [user_updated.name, user_updated.surname, user_id]
    );

    return result;
}



// Dodane na potrzeby index.js

module.exports = {
    workOnDataBase,
    action,
    index_create_db,
    index_get_user,
    index_get_user_id,
    index_get_all_users,
    index_create_user,
    index_delete_user,
    index_update_user,
    DBUser
};

