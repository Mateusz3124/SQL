var mysql = require('mysql2/promise');

async function workOnDataBase(sql) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
    });

    try {
        var result = await connection.query(sql);
        return result
    } finally {
        await connection.end();
    }
}

async function action(sql, data, query_values) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: data
    });

    try {
        var result = await connection.query(sql, query_values);
        return result;
    } finally {
        await connection.end();
    }
}

async function test() {
    try {
        await workOnDataBase("CREATE DATABASE IF NOT EXISTS mydb");
        await action("CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), surname VARCHAR(255), address VARCHAR(255))", "mydb");
        var [resulter] = await action("SHOW TABLES", "mydb");
        console.log(resulter);
        await action("INSERT INTO users (name, surname, address) VALUES ('Marcin', 'Kowalski', 'piaskowa 2')", "mydb");
        //var result = await action("SELECT * FROM users");
        //console.log(result[0]);
        console.log(await action("UPDATE users SET address = 'piaskowa 123' WHERE address = 'piaskowa 2'", "mydb"));
    } catch (err) {
        console.error(err);
    }
}

// Dodane na potrzeby index.js
class DBUser {
    constructor(name, surname) { 
        // if(name == null || surname == null) { throw new Error("Name and surname cannot be nulls."); }
        if(typeof name !== 'string' || typeof surname !== 'string') { throw new Error("Name and surname must be of string types."); }
        if(name.length === 0 || surname.length === 0) { throw new Error("Name and surname must be at least 1 character long."); }
        this.name = name;
        this.surname = surname;
    }
}

const INDEX_DB_NAME = "indexdb";

async function index_create_db() {
    try {
        await workOnDataBase(`CREATE DATABASE IF NOT EXISTS ${INDEX_DB_NAME}`);
        await action("CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), surname VARCHAR(255))", INDEX_DB_NAME);
    } catch (err) {
        console.error(err);
    }
}

async function index_get_user(user) {
    if(!(user instanceof DBUser)) { throw new Error("User parameter must be of type DBUser."); }
    
    const [rows] = await action(
        'SELECT * FROM `users` WHERE `name` = ? AND `surname` = ?', 
        INDEX_DB_NAME,
        [user.name, user.surname]);

    return rows;
}

async function index_get_all_users() {
   const [rows] = await action(
        'SELECT * FROM `users`', INDEX_DB_NAME
   ) 
   return rows
}

async function index_create(user) {
    if(!(user instanceof DBUser)) { throw new Error("User parameter must be of type DBUser."); }
    
    const [result] = await action(
        'INSERT INTO `users` (`name`, `surname`) VALUES (?, ?)', 
        INDEX_DB_NAME,
        [user.name, user.surname]);

    return result;
}

// Dodane na potrzeby index.js

//test()

module.exports = {
    workOnDataBase,
    action,

    //Dodane na potrzeby index.js
    index_create_db, index_get_user, index_get_all_users, index_create, DBUser
};

