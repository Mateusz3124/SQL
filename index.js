const express = require('express')
const sqljs = require('./sql.js')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

app.post('/adduser', (req, res) => {
    try {
        const newuser = new sqljs.DBUser(req.body.name, req.body.surname)
        sqljs.index_create_user(newuser);
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

app.get(('/getusers'), async (req, res) => {
    try {
        const users = await sqljs.index_get_all_users()
        console.log(users)
        res.status(200).send(users)
    } catch(err) {
        res.sendStatus(500)
    }
})

app.delete('/deleteuser', (req, res) => {
    try {
        const user_to_delete = new sqljs.DBUser(req.query.name, req.query.surname);
        sqljs.index_delete_user(user_to_delete);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

app.put('/updateuser', (req, res) => {
    try {
        const user_toupdate = new sqljs.DBUser(req.body.nameToUpdate, req.body.surnameToUpdate);
        console.log(user_toupdate.name + " " + user_toupdate.surname);
        const user_updated = new sqljs.DBUser(req.body.updatedName, req.body.updatedSurname);
        console.log(user_updated);
        sqljs.index_update_user(user_toupdate, user_updated);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

app.listen(port, async () => {
    await sqljs.index_create_db();
    console.log(`Example app listening on port ${port}`)
})
