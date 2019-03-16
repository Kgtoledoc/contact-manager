const restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');


const server = restify.createServer();
const url = `mongodb://${settings.host}:${settings.port}/${settings.database}`;
const connection = MongoClient.connect(url);


server.get('/api/contacts', (req, res) => {
  connection.then(response => {
    const contactsCollection = response.db().collection(settings.collection);
    return contactsCollection.find({}).toArray();
  }).then(response => {
    res.json(response);
  }).catch(error => console.error(error))
})

server.listen(3000, () => {
  console.info('Magic happens on port 3000')
});
