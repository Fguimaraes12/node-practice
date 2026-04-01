import chalk from "chalk"
import express from "express"
import { randomUUID } from "crypto"
import { json } from "stream/consumers"


const server = express()

server.use(express.json())

const products = []

server.get("/products", (req, res) => {
  res.send(products)
})

server.post("/products", (req, res) => {
  const { name } = req.body

  const newValue = {
    id: crypto.randomUUID(),
    name
  }

  products.push(newValue)

  res.status(201).json(products)
})

server.put("/products/:id", (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const findProduct = products.find(p => p.id === id)

  if (findProduct) {
    findProduct.name = name
    res.status(201).json(products)

  } else if (!findProduct) {
    res.status(404).send({ message: "Produto não foi encontrado" })
  }

})

server.delete("/products/:id", (req, res) => {
  const { id } = req.params

  const newValue = products.filter(p => p.id !== id)

  products.push(newValue)

  res.status(200).json({ message: "Produto removido com succeso!" })


})


server.listen(3333, () => {
  console.log(chalk.green("✔ Servidor rodando na porta 3333 ✔ "))
})

