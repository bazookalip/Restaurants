const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));

const PORT = 5000;

const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/restaurant', (req, res) => {
    console.log('/restaurant GET route was hit');
    pool.query('SELECT * FROM "restaurant"')
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with restaurant select', error);
            res.sendStatus(500);
        });
});


app.post('/restaurant', (req, res) => {
    console.log('/books POST route was hit');
    pool.query(`INSERT INTO "restaurant" ("name", "type")
    VALUES ($1, $2);`, [req.body.name, req.body.type])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with restaurant insert', error);
            res.sendStatus(500);
        });
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});