import express from "express";
import cors from "cors";

let produtos = [];
const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("Servidor rodando");
});

////////////////////////////adicionar produto////////////////////////////
app.post("/produtos", (req, res) => {
  const data = req.body;
  const nomeProduto = data.nomeProduto;
  const precoProduto = data.precoProduto;
  try {
    const novoProduto = {
      nomeProduto,
      precoProduto,
    };

    produtos.push(novoProduto);

    res.status(201).json({ message: "produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

////////////////////////////listar produto////////////////////////////
app.get("/produtos", (req, res) => {
  try {
    if (produtos.length > 0) {
      res.status(200).json({ data: produtos });
    } else {
      res.status(400).json({ message: "Lista vazia" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

////////////////////////////remover produto////////////////////////////

app.delete("/produtos/:nomeProduto", (req, res) => {
  const nome = req.params.nomeProduto;
  const indice = produtos.findIndex((produto) => produto.nomeProduto === nome);
  try {
    if (indice !== -1) {
      produtos.splice(indice, 1);
      res.status(200).json({ message: "Produto deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Produto não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

////////////////////////////atualizar produto////////////////////////////

app.put("/produtos/:nomeProduto", (req, res) => {
  const data = req.body;
  const nome = req.params.nomeProduto;
  const nomeProduto = data.nomeProduto;
  const precoProduto = data.precoProduto;

  const novoProduto = {
    nomeProduto,
    precoProduto,
  };

  const indice = produtos.findIndex((produto) => produto.nomeProduto === nome);

  try {
    if (!nomeProduto) {
      return res.status(400).json({ message: "Nome não encontrado" });
    }
    if (!precoProduto) {
      return res.status(400).json({ message: "Preço não encontrado" });
    }
    if (indice !== -1) {
      produtos[indice] = novoProduto;
      res.status(200).json({ message: "Produto atualizado com sucesso!" });
    } else {
      res
        .status(400)
        .json({ message: "Produto não encontrado para atualização!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});
