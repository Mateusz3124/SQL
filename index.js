const express = require('express')
const sqljs = require('./sql.js')
const app = express()
const port = 3000

const INDEX_DB_NAME = "indexdb";

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

app.post('/adduser', (req, res) => {
    try {
        const newuser = new sqljs.DBUser(req.body.name, req.body.surname)
        sqljs.index_create(newuser, INDEX_DB_NAME);
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

app.get(('/getusers'), async (req, res) => {
    try {
        const users = await sqljs.index_get_all_users(INDEX_DB_NAME)
        console.log(users)
        res.status(200).send(users)
    } catch(err) {
        res.sendStatus(500)
    }
})

app.listen(port, async () => {
    await sqljs.index_create_db(INDEX_DB_NAME);
    console.log(`Example app listening on port ${port}`)
})