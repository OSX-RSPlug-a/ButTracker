const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const faker = require('faker')
const expressLayouts = require('express-ejs-layouts')

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const port = 3000;


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
//app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(express.json())
app.use(routes)
//app.use( bodyParser.json() );


app.listen(port, (err) => {
    if (err) {
      console.log('Error heppened')
    } else {
      console.log(`Enabled and web serv list on port ${port}!`)
      console.log('The system running on http://localhost:3000')
    }
});

app.use((req, res, next) => {
  next(console.error(404));
});

module.exports = server