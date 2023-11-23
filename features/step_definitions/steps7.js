const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
let name, surname;
let result;

Given('I have a user with Name and Surname', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Kwiater')", INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Tester')", INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Tester')", INDEX_DB_NAME);
});

Given('i have database with that user already existing', function () {
    name = 'Marcin'; surname = 'Tester'
});

When('I add the user again to the database', async function () {
    result = await sqljs.index_get_all_users(INDEX_DB_NAME);
});

Then('the new user should not be in the database', async function () {
    if(result.length === 3) {
        throw new Error("Database allows for adding of two same users.")
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});