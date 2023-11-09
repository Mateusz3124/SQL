const express = require('express')
const sqljs = require('./sql.js')
const app = express()
const port = 3000

const INDEX_DB_NAME = "indexdb";

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})

app.post('/adduser', async (req, res) => {
    try {
        const newuser = new sqljs.DBUser(req.body.name, req.body.surname);
        await sqljs.index_create_user(newuser, INDEX_DB_NAME);
        res.statusMessage = "Successfully added new user!";
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.statusMessage = "Can't add new user!";
        res.status(400).send(err);
    }
})

app.get(('/getusers'), async (req, res) => {
    try {
        const users = await sqljs.index_get_all_users(INDEX_DB_NAME);
        console.log(users);
        res.statusMessage = "Successfully fetched all users!";
        res.status(200).send(users);
    } catch(err) {
        res.statusMessage = "Can't fetch any user!";
        res.sendStatus(500);
    }
})

app.delete('/deleteuser', async (req, res) => {
    try {
        const user_to_delete = new sqljs.DBUser(req.query.name, req.query.surname);
        await sqljs.index_delete_user(user_to_delete, INDEX_DB_NAME);
        res.statusMessage = "Successfully deleted user!";
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.statusMessage = "Can't delete user!";
        res.status(400).send(err);
    }
});

app.put('/updateuser',async (req, res) => {
    try {
        const user_toupdate = new sqljs.DBUser(req.body.nameToUpdate, req.body.surnameToUpdate);
        const user_updated = new sqljs.DBUser(req.body.updatedName, req.body.updatedSurname);
        await sqljs.index_update_user(user_toupdate, user_updated, INDEX_DB_NAME);
        res.statusMessage = "Successfully updated user!";
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.statusMessage = "Can't update user!";
        res.status(400).send(err);
    }
});

app.listen(port, async () => {
    await sqljs.index_create_db(INDEX_DB_NAME);
    console.log(`Example app listening on port ${port}`);
})
