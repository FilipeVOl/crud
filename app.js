const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/router');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});