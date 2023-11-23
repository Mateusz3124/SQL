const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
let name, surname;
let result;

Given('I have a database with existing user', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
    // await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Tester')", INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Kwiater')", INDEX_DB_NAME);
});

Given('I know name and surname of non-existing user', function () {
    name = 'Marcin'; surname = 'Tester'
});

When('I search for that user in the database', async function () {
    result = await sqljs.index_get_user(new sqljs.DBUser(name, surname), INDEX_DB_NAME);
});

Then('the system should display nothing', async function () {
    if(result.name === 'Marcin' && result.surname === 'Tester') {
        throw new Error("Non-existing user found in database")
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});