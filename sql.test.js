const sqljs = require('./sql.js')

describe("MySQL Functions", () => {

    const INDEX_DB_NAME = "mytest";

    afterAll(async () => {
        await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
    });

    test("should create a database with table", async () => {
        await sqljs.index_create_db(INDEX_DB_NAME);
        const [result] = await sqljs.workOnDataBase('SHOW DATABASES');
        const [result2] = await sqljs.action("SHOW TABLES", INDEX_DB_NAME);
        expect(result.some((obj) => obj.Database === 'mytest')).toBe(true);
        expect(result2.some((obj) => obj.Tables_in_mytest === 'users')).toBe(true);
    });

    test("index_create should create user", async () => {
        const newuser = new sqljs.DBUser("Marcin", "Kwiatkowski")
        await sqljs.index_create_user(newuser, INDEX_DB_NAME);
        const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        expect(result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Kwiatkowski')).toBe(true);
    });

    test("index_update should update given information", async () => {
        const olduser = new sqljs.DBUser("Marcin", "Kwiatkowski")
        const newuser = new sqljs.DBUser("Marcin", "Bogaczewicz")
        await sqljs.index_update_user(olduser, newuser, INDEX_DB_NAME)
        const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        expect(result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Bogaczewicz')).toBe(true);
    });

    test("index_delete should delete information", async () => {
        await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Socha')",INDEX_DB_NAME);
        const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        const test1 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha')
        const userToDelete = new sqljs.DBUser("Marcin", "Socha")
        await sqljs.index_delete_user(userToDelete, INDEX_DB_NAME);
        const [result2] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        const test2 = result2.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha')
        expect(test1 && !test2).toBe(true);
    });

});
