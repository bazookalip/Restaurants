const express = require('express');
const bodyParser = require('body-parser');
const restaurantRouter = require('./routes/restaurant.router');
const app = express();


app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurant', restaurantRouter)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});