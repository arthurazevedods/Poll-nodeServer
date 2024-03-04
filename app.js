const express = require("express")
const cors = require('cors');
const app = express()
const admin = require("firebase-admin")
const router = require("./routes")
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.urlencoded({extended: false}))
app.use(express.json(), cors())
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})
