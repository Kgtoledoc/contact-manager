const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings");
const ObjectID = require("mongodb").ObjectID;
const server = restify.createServer();

const cors = corsMiddleware({
  origins: ["http://localhost:4200"]
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

const url = `mongodb://${settings.host}:${settings.port}/${settings.database}`;
const connection = MongoClient.connect(url);

server.get("/api/contacts", (req, res) => {
  connection
    .then(response => {
      const contactsCollection = response.db().collection(settings.collection);
      return contactsCollection.find({}).toArray();
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => console.error(error));
});

server.post("/api/contacts", (req, res) => {
  connection
    .then(response => {
      const contactsCollection = response.db().collection(settings.collection);
      const contact = req.body;
      return contactsCollection.insertOne(contact);
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.get("/api/contacts/:id", (req, res) => {
  const objectID = req.params.id;
  connection
    .then(response => {
      const contactsCollection = response.db().collection(settings.collection);
      return contactsCollection.findOne(ObjectID(objectID));
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.post("/api/contacts/:id", (req, res) => {
  const objectID = req.params.id;
  connection
    .then(response => {
      const contactsCollection = respose.db().collection(settings.collection);
      const contactBody = req.body;
      return contactsCollection.replaceOnce(
        { _id: ObjectID(objectID) },
        contactBody
      );
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.del("/api/contacts/:id", (req, res) => {
  const objectID = req.params.id;
  connection
    .then(response => {
      const contactsCollection = response.db().collection(settings.collection);
      return contactsCollection.deleteOne({ _id: ObjectID(objectID) });
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.listen(3000, () => {
  console.info("Magic happens on port 3000");
});
