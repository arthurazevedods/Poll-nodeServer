const express = require("express")
const admin = require("firebase-admin/firestore")
const router = express.Router()

//Routes

router.get('/enquets', async (req, res) => {

    try {
        const result = await admin.getFirestore().collection('wishes').get()
        const list = result.docs.map(item => ({
            ...item.data(),
            uid: item.id
        }))

        return res.json(list)
    } catch {
        return res.json("Erro Api")
    }
})

router.get('/enquets/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await admin.getFirestore().collection('wishes').doc(id).get()

        if (!result.exists) {
            return res.json("Documento não encontrado")
        } else {
            return res.json(result.data())
        }

    } catch {
        return res.json("Erro na API")
    }

})

router.put('/enquets/:id', async (req, res) => {
    try {
        const id = req.params.id; // Adicione esta linha para extrair o ID do parâmetro
        console.log("api data" + req.body.like)
        await admin.getFirestore().collection('wishes').doc(id).update({
            votesLike: req.body.like,
            votesUnlike: req.body.unlike
        })

    } catch (error) {
        console.error("Erro ao atualizar enquete:", error);
        return res.status(500).json({ error: "Erro na API" });
    }
})



module.exports = router