const express = require('express');
const router = express.Router();
const pool = requre('../modules/pool');


router.get('/restaurant', (req, res) => {
    console.log('/restaurant GET route was hit');
    pool.query('SELECT * FROM "restaurant"')
        .then(result => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('error with restaurant select', error);
            res.sendStatus(500);
        });
});


router.post('/restaurant', (req, res) => {
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