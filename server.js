const express = require('express')
const path = require('path');
const app = express();

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, 'static/views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.render('pages/index', {title: 'Home'});
})

app.get('/goods', function (request, response) {
    response.render('pages/goods', {title: 'Goods'});
})

app.get('/planet', function (request, response) {
    response.render('pages/planet', {title: 'Planet'});
})

app.get('/spacestation', function (request, response) {
    response.render('pages/spacestation', {title: 'SpaceStation'});
})

app.get('/GoodstoPlanet', function (request, response) {
    response.render('pages/GoodstoPlanet', {title: 'GoodstoPlanet'});
})

app.get('/GoodstoStation', function (request, response) {
    response.render('pages/GoodstoStation', {title: 'GoodstoStation'});
})


app.listen(process.env.PORT || 3000)
