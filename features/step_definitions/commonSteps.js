const { Given,  When, Then  } = require('@cucumber/cucumber');
const sqljs = require('../../sql.js');
const INDEX_DB_NAME = "mytest";

Given('I have a database', async function () {
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
    await sqljs.index_create_db(INDEX_DB_NAME);
});



