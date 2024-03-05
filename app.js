const express = require("express")
const cors = require('cors');
const app = express()
const admin = require("firebase-admin")
const router = require("./routes")
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://seusite.com"); // substitua "https://seusite.com" pelo seu domínio
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})
