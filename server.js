

import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()

const database = new DatabaseMemory()

server.post("/videos", (req, reply) => {
  const { title, description, duration } = req.body

  database.create({
    title,
    description,
    duration
  })

  console.log(database.list())

  return reply.status(201).send()
})

server.get("/videos", () => {
  const videos = database.list()

  return videos
})

server.put("/videos/:id", (req, reply) => {
  const videoId = req.params.id
  const { title, description, duration } = req.body

  database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete("/videos/:id", () => {
  return "Hello Node"
})

server.listen({
  port: 3333,
})