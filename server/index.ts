import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post("/chat-ia", async (req: Request, res: Response) => {
  try {
    const { message } = req.body

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ]
    })

    res.json({
      response: response.choices[0].message.content
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al procesar la solicitud" })
  }
})

app.listen(3001, () => {
  console.log("Servidor en http://localhost:3000")
})
