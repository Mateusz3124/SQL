const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
let result;
Given('the name of the new database', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Tester')", INDEX_DB_NAME);
    await sqljs.action("INSERT INTO users (name, surname) VALUES ('Marcin', 'Kwiater')", INDEX_DB_NAME);
});

When('I create the new database and there is already a database with that name', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
    result = await sqljs.index_get_all_users(INDEX_DB_NAME)
});

Then('the database should not be created with a new table', async function () {
    const test1 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Tester')
    const test2 = result.some((obj) => obj.name === 'Marcin' && obj.surname === 'Kwiater')
    if (!test1 && !test2) {
        throw new Error('New, empty, database replaced the old one');
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});

