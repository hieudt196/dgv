var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();
var  path = require('path');

require('dotenv').config()
require('sexy-require')

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.use(express.static(path.join(__dirname, '/assets/')));

router.use((request, response, next) => {
  next();
});

// test api
router.route('/').get((request, response) => {
    response.json({ result: 'OK' });
})

// route
app.use("/report",require("/routes/report"));
app.use("/reportx",require("/routes/reportx"));

var  port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);