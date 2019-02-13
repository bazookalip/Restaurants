const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', restaurantRouter)


const restaurantRouter = require(./routes/restaurantRouter)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});