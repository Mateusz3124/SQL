const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
let INDEX_DB_NAME;
let name, surname;
let result;

Given('the name of the database', async function () {
    INDEX_DB_NAME = "mytest";
});

When('I create the database', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
});

Then('the database should be created with a new table', async function () {
    const [result] = await sqljs.workOnDataBase('SHOW DATABASES');
    const [result2] = await sqljs.action("SHOW TABLES", INDEX_DB_NAME);


    if(!result.some((obj) => obj.Database === 'mytest')){
        throw new Error('No database');
    }
    if(!result2.some((obj) => obj.Tables_in_mytest === 'users')){
        throw new Error('No table');
    }


    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});