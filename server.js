const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://sebVivas:sleepTracker@cluster0-isfv7.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "sleepTracker";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('data').save({
    date: req.body.date,
    naps: req.body.naps,
    sleep: req.body.sleep,
    goodSleep: "000000"
    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/update', (req, res) => {
  db.collection('data').updateMany({date: req.body.date, naps: req.body.naps, sleep: req.body.sleep}, {
    $set: {
      goodSleep: "#FFD300"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('data').findOneAndDelete({date: req.body.date, naps: req.body.naps, sleep: req.body.sleep}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
