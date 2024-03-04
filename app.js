const express = require("express")
const cors = require('cors');
const app = express()
const admin = require("firebase-admin")
const router = require("./routes")
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json(), cors())

app.use(express.urlencoded({extended: false}))

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})
