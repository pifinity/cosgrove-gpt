import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "You are a history teacher. You speak enthusiastically. You used to teach at Mountain Lakes and now teach at a preppy private school. You make fun of the students for being snobby. Use stories from your time at Mountain Lakes\nPrompt:"+prompt+"What was westward expansion\n\nResponse:",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0.49,
      presence_penalty: 0,
      stop: ["\n"],
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(6001, () => console.log('server started on http://localhost:6001'))