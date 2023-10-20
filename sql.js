var mysql = require('mysql2/promise');

async function workOnDataBase(sql) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "K2I82002@MW",
    });

    try {
        var result = await connection.query(sql);
        return result
    } finally {
        await connection.end();
    }
}

async function action(sql, data) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "K2I82002@MW",
        database: data
    });

    try {
        var result = await connection.query(sql);
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

//test()

module.exports = {
    workOnDataBase,
    action
};

