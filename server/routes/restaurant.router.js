const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    console.log('/restaurant GET route was hit');
    pool.query('SELECT * FROM "restaurant" ORDER BY "id";')
        .then(result => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('error with restaurant select', error);
            res.sendStatus(500);
        });
});


router.post('/', (req, res) => {
    console.log('/restaurant POST route was hit');
    pool.query(`INSERT INTO "restaurant" ("name", "type", "rating")
    VALUES ($1, $2, $3);`, [req.body.name, req.body.type, req.body.rating])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with restaurant insert', error);
            res.sendStatus(500);
        });
});



router.delete('/:id', (req, res) => {
    console.log('/restaurant DELETE request was hit');
    console.log('req.params', req.params);
    pool.query(`DELETE FROM "restaurant" WHERE "id"=$1;`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the restaurant delete query', error);
            res.sendStatus(500);
        });
});



router.put('/:id', (req, res) => {
    console.log('/restaurant save request was hit');
    console.log('req.params', req.params);
    pool.query(`UPDATE "restaurant" SET "rating"=$1  WHERE "id"= $2;`, [req.body.rating, req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the restaurant update query', error);
            res.sendStatus(500);
        });
});

module.exports = router;
