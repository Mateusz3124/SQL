const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
var result;

Given('I have a database with users', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Tester')", INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Kwiater')", INDEX_DB_NAME);
});

When('I look up the users from the database', async function () {
    result = await sqljs.index_get_all_users(INDEX_DB_NAME)
});

Then('the system should display a list of users in the database', async function () {
    const test1 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Tester')
    const test2 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Kwiater')
    if (!test1 && !test2) {
        throw new Error('User not found in the database');
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});

