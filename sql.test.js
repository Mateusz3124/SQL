const { workOnDataBase, action } = require('./sql.js');

describe("MySQL Functions", () => {

    afterAll(async () => {
        await workOnDataBase("DROP DATABASE IF EXISTS mytest");
    });

    test("createTable should create a database", async () => {
        await workOnDataBase("CREATE DATABASE IF NOT EXISTS mytest");
        const [result] = await workOnDataBase('SHOW DATABASES');
        expect(result.some((obj) => obj.Database === 'mytest')).toBe(true);
    });

    test("action should create table", async () => {
        await action("CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), surname VARCHAR(255), address VARCHAR(255))", "mytest");
        const [result] = await action("SHOW TABLES", "mytest");
        expect(result.some((obj) => obj.Tables_in_mytest === 'users')).toBe(true);
    });

    test("action should insert and read information", async () => {
        await action("INSERT INTO users (name, surname, address) VALUES ('Marcin', 'Kowalski', 'piaskowa 2')", "mytest");
        const [result] = await action("SELECT * FROM users", "mytest");
        expect(result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Kowalski' && obj.address === 'piaskowa 2')).toBe(true);
    });

    test("action should update given information", async () => {
        await action("INSERT INTO users (name, surname, address) VALUES ('Marcin', 'Bogaczewicz', 'piaskowa 21')", "mytest");
        await action("UPDATE users SET address = 'piaskowa 201' WHERE surname = 'Bogaczewicz'", "mytest");
        const [result] = await action("SELECT * FROM users", "mytest");
        expect(result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Bogaczewicz' && obj.address === 'piaskowa 201')).toBe(true);
    });

    test("action should delete information", async () => {
        await action("INSERT INTO users (name, surname, address) VALUES ('Marcin', 'Socha', 'piaskowa 212')", "mytest");
        const [result] = await action("SELECT * FROM users", "mytest");
        const test1 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha' && obj.address === 'piaskowa 212')
        await action("DELETE FROM users WHERE surname = 'Socha'", "mytest");
        const [result2] = await action("SELECT * FROM users", "mytest");
        const test2 = result2.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha' && obj.address === 'piaskowa 212')
        expect(test1 && !test2).toBe(true);
    });

});