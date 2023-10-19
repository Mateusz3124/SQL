var mysql = require('mysql2/promise');

async function createTable(sql) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
    });

    try {
        await connection.query(sql);
    } finally {
        await connection.end();
    }
}

async function action(sql) {
    var connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
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
        await createTable("CREATE DATABASE IF NOT EXISTS mydb");
        await action("CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), surname VARCHAR(255), address VARCHAR(255))");
        await action("INSERT INTO users (name, surname, address) VALUES ('Marcin', 'Kowalski', 'piaskowa 2')");
        var result = await action("SELECT * FROM users");
        console.log(result[0]);
        await action("UPDATE users SET address = 'piaskowa 123' WHERE address = 'piaskowa 2'");
    } catch (err) {
        console.error(err);
    }
}

test();
