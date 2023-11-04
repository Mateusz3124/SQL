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

    test.each([
        ["", "Kwiatkowski"],
        ["Jan", ""],
        ["", ""],
    ])("index_create should throw an exception when new user name or surname is empty", async (name, surname) => {
        try {
            const newuser = new sqljs.DBUser(name, surname);
        } catch (err) {
            expect(err.message).toBe("Name and surname must be at least 1 character long.");
        }
    });  
    
    
    test.each([
        [1, "Kwiatkowski"],
        ["Jan", 1],
        [1, 1],
    ])("index_create should throw an exception when new user name or surname is not string", async (name, surname) => {
        try {
            const newuser = new sqljs.DBUser(name, surname);
        } catch (err) {
            expect(err.message).toBe("Name and surname must be of string types.");
        }
    }); 

    test("index_update should update given information", async () => {
        const olduser = new sqljs.DBUser("Marcin", "Kwiatkowski")
        const newuser = new sqljs.DBUser("Marcin", "Bogaczewicz")
        const id = await sqljs.index_get_user_id(olduser, INDEX_DB_NAME)
        await sqljs.index_update_user(id, newuser, INDEX_DB_NAME)
        const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        expect(result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Bogaczewicz')).toBe(true);
    });


    test("index_update should throw exception when user with given id doesnt exist", async () => {
        try {
            const newuser = new sqljs.DBUser("Marcin", "Bogaczewicz")
            await sqljs.index_update_user(10, newuser, INDEX_DB_NAME)
        } catch (err) {
            expect(err.message).toBe("User with the given ID not found");
        }
    });

    test("index_delete should delete information", async () => {
        await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Socha')", INDEX_DB_NAME);
        const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        const test1 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha')
        const usertodelete = new sqljs.DBUser("Marcin", "Socha")
        const id = await sqljs.index_get_user_id(usertodelete, INDEX_DB_NAME)
        await sqljs.index_delete_user(id, INDEX_DB_NAME);
        const [result2] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
        const test2 = result2.some((obj) => obj.name === 'Marcin' && obj.surname === 'Socha')
        expect(test1 && !test2).toBe(true);
    });
    
    test("index_delete should throw exception when user with given id doesnt exist", async () => {
        try {
            await sqljs.index_delete_user(10, INDEX_DB_NAME)
        } catch (err) {
            expect(err.message).toBe("User with the given ID not found");
        }
    });

});
