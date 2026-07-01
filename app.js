/*
primeiro_pais
segundo_pais
valor_primeiro_pais
valor_segundo_pais
valor_aposta
*/ 
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

let bolao = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/bolao", (req, res) => {
    res.json(bolao);
});

app.post("/bolao", (req, res) => {
    const apostasbolao = {
        id: bolao.length + 1,
        apostador: req.body.apostador, 
        pais1: req.body.pais1,
        pais2: req.body.pais2, 
        placar1: req.body.placar1,
        placar2: req.body.placar2,
        valor: req.body.valor
    }

    bolao.push(apostasbolao);

    res.json(apostasbolao);
});

app.put("/bolao/:id", (req, res) => {

    const id = Number(req.params.id);

    const aposta = bolao.find(item => item.id === id);

    if (!aposta) {
        return res.status(404).json({
            mensagem: "Aposta não encontrada."
        });
    }

    aposta.apostador = req.body.apostador;
    aposta.pais1 = req.body.pais1;
    aposta.pais2 = req.body.pais2;
    aposta.placar1 = req.body.placar1;
    aposta.placar2 = req.body.placar2;
    aposta.valor = req.body.valor;

    res.json(aposta);
});

app.delete("/bolao/:id", (req, res) => {

    const id = Number(req.params.id);

    const indice = bolao.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aposta não encontrada."
        });
    }

    bolao.splice(indice, 1);

    res.json({
        mensagem: "Aposta excluída com sucesso."
    });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {});